// - Prisma's imports
import { accountType as prismaAccountType, bank as prismaBank, account as prismaAccount } from '@prisma/client'

// - Entity's imports
import { AccountType } from '@domain/entities/accountType.entity'
import { Account } from '@domain/entities/account.entity'
import { Bank } from '@domain/entities/bank.entity'

// - Type's imports
import { taccountType } from '@shared/types/accountType.type'
import { tBank } from '@shared/types/bank.type'

/**
 * Maps a Prisma account entity to a domain Account entity.
 * Optionally maps the associated bank and accountType entities if available.
 *
 * @param {prismaAccount & { bank?: prismaBank } & { accountType?: prismaAccountType }} prismaAccount - The account entity from Prisma Client, optionally including associated bank and accountType.
 * @returns {Account} - The mapped domain Account entity.
 */
export function toDomainAccount (prismaAccount: (prismaAccount & { bank?: prismaBank } & { accountType?: prismaAccountType })): Account {
  return new Account(
    prismaAccount.id,
    prismaAccount.idUser,
    prismaAccount.name,
    prismaAccount.idBank,
    prismaAccount.idAccountType,
    prismaAccount.balance.toNumber(),
    prismaAccount.accountNumber,
    prismaAccount.createdAt,
    prismaAccount.updatedAt,
    prismaAccount.creditUsed !== null ? prismaAccount.creditUsed.toNumber() : undefined,
    prismaAccount.creditLimit !== null ? prismaAccount.creditLimit.toNumber() : undefined,
    prismaAccount.cutOffDate !== null ? prismaAccount.cutOffDate : undefined,
    prismaAccount.paymentDueDate !== null ? prismaAccount.paymentDueDate : undefined,
    prismaAccount.bank !== undefined ? new Bank(prismaAccount.bank.id, prismaAccount.bank.name as tBank) : undefined,
    prismaAccount.accountType !== undefined ? new AccountType(prismaAccount.accountType.id, prismaAccount.accountType.name as taccountType) : undefined
  )
}
