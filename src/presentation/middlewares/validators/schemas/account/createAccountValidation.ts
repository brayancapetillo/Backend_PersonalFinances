import { accountSchema } from './accountValidation'

export const createAccountSchema = accountSchema.pick({
  idUser: true,
  name: true,
  idBank: true,
  idAccountType: true,
  balance: true,
  accountNumber: true
})
