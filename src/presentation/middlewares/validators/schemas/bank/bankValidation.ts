import { z } from 'zod'

export const bankParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id must be a number').refine((val) => parseInt(val, 10) > 0, { message: 'id must be a positive number' })
})
