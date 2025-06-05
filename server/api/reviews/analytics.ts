// server/api/reviews/analytics.ts
import { defineEventHandler } from 'h3'
import { getSupabaseClient } from '~/server/utils/supabase';
import type { AnalyticsData } from '~/types'

export default defineEventHandler(async () => {
    const supabase = getSupabaseClient();

    // Получение всех отзывов для аналитики
    const { data: reviews, error } = await supabase
        .from('reviews')
        .select('*')

    if (error) {
        throw createError({
            statusCode: 500,
            message: error.message
        })
    }

    if (!reviews || reviews.length === 0) {
        // Возвращаем пустые данные, если отзывов нет
        return {
            totalReviews: 0,
            averageRating: 0,
            sentimentCounts: { positive: 0, neutral: 0, negative: 0 },
            sentimentPercentages: { positive: 0, neutral: 0, negative: 0 },
            ratingDistribution: [0, 0, 0, 0, 0],
            reviewsPerDay: []
        } as AnalyticsData;
    }

    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

    const sentimentCounts = {
        positive: reviews.filter(r => r.sentiment === 'positive').length,
        neutral: reviews.filter(r => r.sentiment === 'neutral').length,
        negative: reviews.filter(r => r.sentiment === 'negative').length,
    };

    const sentimentPercentages = {
        positive: (sentimentCounts.positive / totalReviews * 100) || 0,
        neutral: (sentimentCounts.neutral / totalReviews * 100) || 0,
        negative: (sentimentCounts.negative / totalReviews * 100) || 0,
    };

    // Распределение по рейтингам (от 1 до 5)
    const ratingDistribution = [1, 2, 3, 4, 5].map(rating =>
        reviews.filter(r => r.rating === rating).length
    );

    // Группировка отзывов по дням для построения графика
    const reviewsByDate = reviews.reduce<Record<string, number>>((acc, review) => {
        const date = review.created_at.split('T')[0];
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date]++;
        return acc;
    }, {});

    // Явное приведение типа для решения проблемы типизации
    const reviewsPerDay: { date: string; count: number }[] = Object.entries(reviewsByDate)
        .map(([date, count]) => ({ date, count: Number(count) }))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-30); // Последние 30 дней

    const analyticsData: AnalyticsData = {
        totalReviews,
        averageRating,
        sentimentCounts,
        sentimentPercentages,
        ratingDistribution,
        reviewsPerDay,
    };

    return analyticsData;
});