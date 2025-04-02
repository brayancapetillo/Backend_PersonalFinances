/**
 * @file transactionTypePrismaRepository.ts
 * @description Repository class for managing TransactionType entities using Prisma as the ORM.
 * This class implements the TransactionTypeRepository interface and provides methods for
 * interacting with the transaction_type table in the database.
 *
 * @module Repositories/TransactionType
 */

// -Entity's import
import { TransactionType } from '@domain/entities/transactionType'

// -Interfaces import
import { ITransactionTypeRepository } from '@domain/interfaces/transactionTypePrismaRepository'

// -Mapper's import
import { toDomainTransactionType } from '@infrastructure/mappers/transactionType/transactionTypeMapper'

// -Prisma's import
import { PrismaClient, transactionType as prismaTransactionType } from '@prisma/client'

/**
 * TransactionTypePrismaRepository class for handling database operations related to TransactionType entities.
 * This class implements the TransactionTypeRepository interface, providing methods for
 * retrieving TransactionType entities in the database.
 */
export class TransactionTypePrismaRepository implements ITransactionTypeRepository {
  private readonly prisma: PrismaClient

  /**
   * Constructor for TransactionTypePrismaRepository.
   *
   * @param {PrismaClient} prisma - An instance of PrismaClient for database operations.
   */
  constructor (prisma: PrismaClient) { this.prisma = prisma }

  /**
   * Retrieves the list of transaction types from the database.
   *
   * @returns {Promise<TransactionType[]>} A promise that resolves to an array of TransactionType entities.
   */
  public async getTransactionsType (): Promise<TransactionType[]> {
    const transactionsType: prismaTransactionType[] = await this.prisma.transactionType.findMany()
    return transactionsType.map((item: prismaTransactionType) => toDomainTransactionType(item))
  }
}
