import { TransactionPF } from '@domain/entities/transactionPF.entity'

export interface ItransactionPFRepository {
  create: (transactionPF: TransactionPF) => Promise<TransactionPF>
}
