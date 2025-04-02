import { TransactionType } from '@domain/entities/transactionType'

export interface ITransactionTypeRepository {
  getTransactionsType: () => Promise<TransactionType[]>
}
