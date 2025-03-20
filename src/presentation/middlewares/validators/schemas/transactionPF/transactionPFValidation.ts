import { z } from 'zod'

export const transactionPFSchema = z.object({
  id: z.number().int().positive('id must be a positive integer'),
  idCategory: z.number().int().positive('idCategory must be a positive integer'),
  idAccount: z.number().int().positive('idAccount must be a positive integer'),
  amount: z.number().positive('amount must be a positive decimal'),
  transactionDate: z.string({ required_error: 'transactionDate is required' }).nonempty('transactionDate cannot be empty').refine((val) => !isNaN(Date.parse(val)), { message: 'transactionDate must be a valid date' }),
  idTransactionType: z.number().int().positive('idTransactionType must be a positive integer'),
  thirdParties: z.boolean({ required_error: 'thirdParties is required' }),
  description: z.string({ required_error: 'description is required' })
})
