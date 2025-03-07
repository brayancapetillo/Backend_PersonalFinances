import { ZodSchema } from 'zod'
import { bankParamsSchema } from './bankValidation'

export const bankIdSchema: ZodSchema = bankParamsSchema.pick({ id: true })
