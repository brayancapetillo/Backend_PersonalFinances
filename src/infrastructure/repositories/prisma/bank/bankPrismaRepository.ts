/**
 * @file bankPrismaRepository.ts
 * @description Repository class for managing Bank entities using Prisma as the ORM.
 * This class implements the BankRepository interface and provides methods for
 * interacting with the bank table in the database.
 *
 * @module Repositories/Bank
 */

// -Entity's import
import { IBankRepository } from '@domain/interfaces/bankRepository'
import { Bank } from '@domain/entities/bank.entity'

// -Type's import
import { tBank } from '@shared/types/bank.type'

// -Prisma's import
import { bank as PrismaBank, PrismaClient } from '@prisma/client'

/**
 * BankPrismaRepository class for handling database operations related to Bank entities.
 * This class implements the BankRepository interface, providing methods for
 * retrieving Bank entities in the database.
 */
export class BankPrismaRepository implements IBankRepository {
  private readonly prisma: PrismaClient

  /**
   * Constructor for BankPrismaRepository.
   *
   * @param {PrismaClient} prisma - An instance of PrismaClient for database operations.
   */
  constructor (prisma: PrismaClient) { this.prisma = prisma }

  /**
   * Retrieves the list of banks from the database.
   *
   * @returns {Promise<Bank[]>} A promise that resolves to an array of Bank entities.
   */
  public async getBanks (): Promise<Bank[]> {
    const banks: PrismaBank[] = await this.prisma.bank.findMany()
    return banks.map((item: PrismaBank) => this.toDomain(item))
  }

  /**
   * Retrieves a bank entity by its ID from the database.
   *
   * @param {number} id - The unique identifier of the bank.
   * @returns {Promise<Bank | null>} A promise that resolves to the Bank entity if found, or null if not found.
   */
  public async getBankById (id: number): Promise<Bank | null> {
    const bank: PrismaBank | null = await this.prisma.bank.findUnique({ where: { id } })
    return bank !== null ? this.toDomain(bank) : null
  }

  /**
   * Converts a Prisma bank entity to a domain bank entity.
   *
   * @param {PrismaBank} prismaBank - The Prisma bank entity to convert.
   * @returns {Bank} The converted Bank entity.
   */
  private toDomain (prismaBank: PrismaBank): Bank {
    return new Bank(prismaBank.id, prismaBank.name as tBank)
  }
}
