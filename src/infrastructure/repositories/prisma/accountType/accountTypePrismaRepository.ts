/**
 * @file AccountTypePrismaRepository.ts
 * @description Repository class for managing AccountType entities using Prisma as the ORM.
 * This class implements the AccountTypeRepository interface and provides methods for
 * interacting with the AccountType table in the database.
 *
 * @module Repositories/AccountType
 */

// -Entity's import
import { IAccountTypeRepository } from '@domain/interfaces/accountTypeRepository'
import { AccountType } from '@domain/entities/accountType.entity'

// -Type's import
import { taccountType } from '@shared/types/accountType.type'

// -Prisma's import
import { accountType as accountTypePrisma, PrismaClient } from '@prisma/client'

/**
 * AccountTypePrismaRepository class for handling database operations related to AccountType entities.
 * This class implements the AccountTypeRepository interface, providing methods for
 * retrieving AccountType entities in the database.
 */
export class AccountTypePrismaRepository implements IAccountTypeRepository {
  private readonly prisma: PrismaClient

  /**
   * Constructor for AccountTypePrismaRepository.
   *
   * @param {PrismaClient} prisma - An instance of PrismaClient for database operations.
   */
  constructor (prisma: PrismaClient) { this.prisma = prisma }

  /**
   * Retrieves the list of AccountType from the database.
   *
   * @returns {Promise<AccountType[]>} A promise that resolves to an array of AccountType entities.
   */
  public async getAccountsType (): Promise<AccountType[]> {
    const accountsType: accountTypePrisma[] = await this.prisma.accountType.findMany()
    return accountsType.map((item: accountTypePrisma) => this.toDomain(item))
  }

  /**
   * Converts a Prisma AccountType entity to a domain AccountType entity.
   *
   * @param {accountTypePrisma} accountType - The Prisma AccountType entity to convert.
   * @returns {AccountType} The converted AccountType entity.
   */
  private toDomain (accountType: accountTypePrisma): AccountType {
    return new AccountType(accountType.id, accountType.name as taccountType)
  }
}
