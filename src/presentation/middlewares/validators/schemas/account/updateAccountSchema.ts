import { accountSchema } from './accountValidation'

export const updateAccountSchema = accountSchema.pick({
  name: true,
  idBank: true,
  idAccountType: true,
  balance: true,
  accountNumber: true
}).partial()
