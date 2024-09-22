import { ZodSchema } from 'zod'
import { accountParamsSchema } from './accountValidation'

export const accountIdSchema: ZodSchema = accountParamsSchema.pick({ id: true })
