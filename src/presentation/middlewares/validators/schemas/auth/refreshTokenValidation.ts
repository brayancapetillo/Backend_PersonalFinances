import { z } from 'zod'

export const refreshTokenSchema = z.object({
  refreshToken: z.string({ required_error: 'refreshToken is required', invalid_type_error: 'refreshToken must be string' }).nonempty('refreshToken cannot be empty')
})
