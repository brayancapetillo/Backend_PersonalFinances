// - Prisma's imports
import { account as prismaAccount, category as prismaCategory, transactionPF as prismaTransactionPF } from '@prisma/client'

// - Entity's imports
import { TransactionPF } from '@domain/entities/transactionPF.entity'

// - Mapper's imports
import { toDomainCategory } from '../category/categoryMapper'
import { toDomainAccount } from '../account/accountMapper'

export function toDomainTransactionPF (prismaTransactionPF: (prismaTransactionPF & { category?: prismaCategory } & { account?: prismaAccount })): TransactionPF {
  return new TransactionPF(
    prismaTransactionPF.id,
    prismaTransactionPF.idCategory,
    prismaTransactionPF.idAccount,
    prismaTransactionPF.amount.toNumber(),
    prismaTransactionPF.transactionDate,
    prismaTransactionPF.idTransactionType,
    prismaTransactionPF.thirdParties,
    prismaTransactionPF.description,
    prismaTransactionPF.createdAt,
    prismaTransactionPF.category !== undefined ? toDomainCategory(prismaTransactionPF.category) : undefined,
    prismaTransactionPF.account !== undefined ? toDomainAccount(prismaTransactionPF.account) : undefined
  )
}
