import { ZodSchema } from 'zod'
import { signUpSchema } from './signUpValidation'

export const signInSchema: ZodSchema = signUpSchema.pick({
  email: true,
  password: true
})
