import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(4),
  password: z.string().min(8)
})

export const loginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8)
})
