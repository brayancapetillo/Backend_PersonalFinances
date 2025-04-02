// - Entity's imports
import { TransactionType } from '@domain/entities/transactionType'

// - Prisma's imports
import { transactionType as prismaTransactionType } from '@prisma/client'

/**
 * Converts a Prisma `transactionType` entity to a domain `TransactionType` entity.
 *
 * @param {prismaTransactionType} transactionType - The Prisma Client transaction type object.
 * @returns {TransactionType} - The corresponding `TransactionType` domain entity.
 */
export function toDomainTransactionType (transactionType: prismaTransactionType): TransactionType {
  return new TransactionType(transactionType.id, transactionType.name)
}
