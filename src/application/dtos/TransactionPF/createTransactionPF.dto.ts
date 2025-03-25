import { TransactionPF } from '@domain/entities/transactionPF.entity'

export type createTransactionPFDTO = Omit<TransactionPF, 'id' | 'createdAt' | 'category' | 'account'>
