import { accountSchema } from './accountValidation'

export const createAccountSchema = accountSchema.pick({
  name: true,
  idBank: true,
  idAccountType: true,
  balance: true,
  accountNumber: true,
  creditUsed: true,
  creditLimit: true,
  cutOffDate: true,
  paymentDueDate: true
})
