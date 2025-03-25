import { transactionPFSchema } from './transactionPFValidation'

export const createTransactionPFSchema = transactionPFSchema.pick({
  idCategory: true,
  idAccount: true,
  amount: true,
  transactionDate: true,
  idTransactionType: true,
  thirdParties: true,
  description: true
})
