import { AccountType } from '@domain/entities/accountType.entity'

export const dataAccountType: Array<Pick<AccountType, 'name'>> = [
  { name: 'Debit' },
  { name: 'Credit' },
  { name: 'cash' }
]
