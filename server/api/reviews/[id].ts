// server/api/reviews/[id].ts
import { defineEventHandler, readBody, getRouterParam } from 'h3'
import { getSupabaseClient } from '~/server/utils/supabase';


export default defineEventHandler(async (event) => {
    const supabase = getSupabaseClient();

    const id = getRouterParam(event, 'id')
    const method = event.node.req.method

    // GET /api/reviews/:id - получить отзыв по ID
    if (method === 'GET') {
        const { data, error } = await supabase
            .from('reviews')
            .select(`
        *,
        user:user_id(id, username, email, avatar_url),
        product:product_id(id, name, price, image_url)
      `)
            .eq('id', id)
            .single()

        if (error) {
            throw createError({
                statusCode: 404,
                message: 'Отзыв не найден'
            })
        }

        return data
    }

    // PUT /api/reviews/:id - обновить отзыв
    if (method === 'PUT') {
        const body = await readBody(event)

        // Перерасчёт тональности если текст или рейтинг изменились
        let sentiment
        if (body.text || body.rating) {
            // Получаем текущий отзыв для обновления тональности
            const { data: currentReview } = await supabase
                .from('reviews')
                .select('text, rating')
                .eq('id', id)
                .single()

            if (currentReview) {
                sentiment = analyzeSentiment(
                    body.text || currentReview.text,
                    body.rating || currentReview.rating
                )
            }
        }

        const { data, error } = await supabase
            .from('reviews')
            .update({
                ...body,
                sentiment,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()

        if (error) {
            throw createError({
                statusCode: 500,
                message: error.message
            })
        }

        return data[0]
    }

    // DELETE /api/reviews/:id - удалить отзыв
    if (method === 'DELETE') {
        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id)

        if (error) {
            throw createError({
                statusCode: 500,
                message: error.message
            })
        }

        return { success: true }
    }
})

// Простой анализатор тональности
function analyzeSentiment(text: string, rating: number): 'positive' | 'neutral' | 'negative' {
    if (rating >= 4) return 'positive'
    if (rating <= 2) return 'negative'
    return 'neutral'
}