// server/api/reviews/index.ts
import { defineEventHandler } from 'h3';
import { getSupabaseClient } from '~/server/utils/supabase';

import type { Review } from '~/types'

export default defineEventHandler(async (event) => {
    const supabase = getSupabaseClient();

    const method = event.node.req.method

    // GET /api/reviews - получить все отзывы
    if (method === 'GET') {
        const { data, error } = await supabase
            .from('reviews')
            .select(`
        *,
        user:user_id(id, username, email, avatar_url),
        product:product_id(id, name, price, image_url)
      `)
            .order('created_at', { ascending: false })

        if (error) {
            throw createError({
                statusCode: 500,
                message: error.message
            })
        }

        return data as Review[]
    }

    // POST /api/reviews - создать новый отзыв
    if (method === 'POST') {
        const body = await readBody(event)

        // Анализ тональности отзыва
        const sentiment = analyzeSentiment(body.text, body.rating)

        const review = {
            user_id: body.user_id,
            product_id: body.product_id,
            rating: body.rating,
            text: body.text,
            sentiment,
            created_at: new Date().toISOString()
        }

        const { data, error } = await supabase
            .from('reviews')
            .insert(review)
            .select()

        if (error) {
            throw createError({
                statusCode: 500,
                message: error.message
            })
        }

        return data[0]
    }
})

// Простой анализатор тональности
function analyzeSentiment(text: string, rating: number): 'positive' | 'neutral' | 'negative' {
    // В реальном приложении здесь будет интеграция с API анализа тональности
    if (rating >= 4) return 'positive'
    if (rating <= 2) return 'negative'
    return 'neutral'
}