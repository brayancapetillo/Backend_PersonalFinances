import { accountSchema } from './accountValidation'

export const updateAccountSchema = accountSchema.pick({
  id: true,
  name: true,
  idBank: true,
  idAccountType: true,
  balance: true,
  accountNumber: true
}).partial()
