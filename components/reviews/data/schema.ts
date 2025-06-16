import { z } from 'zod'

// Review schema based on the existing Review interface
export const reviewSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  product_id: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string(),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
  created_at: z.string(),
  updated_at: z.string().optional(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    avatar_url: z.string().optional(),
  }).optional(),
  product: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    image_url: z.string().optional(),
  }).optional(),
})

export type Review = z.infer<typeof reviewSchema>