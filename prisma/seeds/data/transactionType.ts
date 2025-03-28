import { TransactionType } from '@domain/entities/transactionType'

export const dataTransactionType: Array<Pick<TransactionType, 'name'>> = [
  { name: 'required' },
  { name: 'optional' },
  { name: 'not required' }
]
