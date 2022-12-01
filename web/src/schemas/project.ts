import { z } from 'zod'

const costRegex = /^\d{1,}$/
const zipCodeRegex = /^\d{8}$/

export const projectSchema = z.object({
  cost: z.string().regex(costRegex),
  deadline: z.preprocess((arg: any) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
    return arg
  }, z.date()),
  title: z.string().min(4),
  zip_code: z.string().regex(zipCodeRegex)
})
