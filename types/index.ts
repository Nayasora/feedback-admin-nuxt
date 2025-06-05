// types/index.ts
export interface User {
    id: string
    username: string
    email: string
    avatar_url?: string
    role: 'admin' | 'moderator' | 'user'
    created_at: string
    last_login?: string
}

export interface Product {
    id: string
    name: string
    description: string
    price: number
    image_url?: string
    category: string
    created_at: string
}

export interface Review {
    id: string
    user_id: string
    product_id: string
    rating: number
    text: string
    sentiment: 'positive' | 'neutral' | 'negative'
    created_at: string
    updated_at?: string

    // Связанные данные
    user?: User
    product?: Product
}

export interface AnalyticsData {
    totalReviews: number
    averageRating: number
    sentimentCounts: {
        positive: number
        neutral: number
        negative: number
    }
    sentimentPercentages: {
        positive: number
        neutral: number
        negative: number
    }
    ratingDistribution: number[]
    reviewsPerDay: {
        date: string
        count: number
    }[]
}