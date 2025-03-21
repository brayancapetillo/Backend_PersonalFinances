/**
 * @file transactionPFPrismaRepository.ts
 * @description Repository class for managing TransactionPF entities using Prisma as the ORM.
 * This class implements the ItransactionPFRepository interface and provides methods for
 * interacting with the transactionPF table in the database.
 *
 * @module Repositories/TransactionPF
 */

// -Entity's import
import { ItransactionPFRepository } from '@domain/interfaces/transactionPFRepository'
import { TransactionPF } from '@domain/entities/transactionPF.entity'

// -Prisma's import
import { PrismaClient, transactionPF as prismaTransaction } from '@prisma/client'

// -Mapper's import
import { toDomainTransactionPF } from '@infrastructure/mappers/transactionPF/transactionPFMapper'

/**
 * TransactionPFPrismaRepository class for handling database operations related to TransactionPF entities.
 * This class implements the ItransactionPFRepository interface, providing methods for
 * creating TransactionPF entities in the database.
 */
export class TransactionPFPrismaRepository implements ItransactionPFRepository {
  private readonly prisma: PrismaClient

  /**
   * Constructor for TransactionPFPrismaRepository.
   *
   * @param {PrismaClient} prisma - An instance of PrismaClient for database operations.
   */
  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  /**
   * Creates a new TransactionPF in the database.
   *
   * @param {TransactionPF} transactionPF - The TransactionPF entity to create.
   * @returns {Promise<TransactionPF>} A promise that resolves to the created TransactionPF entity.
   */
  public async create (transactionPF: TransactionPF): Promise<TransactionPF> {
    const transaction: prismaTransaction | null = await this.prisma.transactionPF.create(
      {
        data: {
          idCategory: transactionPF.idCategory,
          idAccount: transactionPF.idAccount,
          amount: transactionPF.amount,
          transactionDate: transactionPF.transactionDate,
          description: transactionPF.description,
          createdAt: transactionPF.createdAt,
          idTransactionType: transactionPF.idTransactionType,
          thirdParties: transactionPF.thirdParties
        }
      }
    )

    return toDomainTransactionPF(transaction)
  }
}
