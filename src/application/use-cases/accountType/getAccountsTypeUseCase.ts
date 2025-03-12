/**
 * @file GetAccountsTypeUseCase.ts
 * @description This use case handles the process of retrieving the list of account types from the database.
 *
 * @module UseCases/AccountType
 */

// -Entity's import
import { AccountType } from '@domain/entities/accountType.entity'

// -Repositories imports
import { AccountTypePrismaRepository } from '@infrastructure/repositories/prisma/accountType/accountTypePrismaRepository'

/**
 * GetAccountsTypeUseCase class
 *
 * This class implements the logic for retrieving the list of types account.
 */
export class GetAccountsTypeUseCase {
  /**
   * Constructs a GetAccountsTypeUseCase instance.
   *
   * @param {AccountTypePrismaRepository}AccountTypeRepository - An instance of AccountTypePrismaRepository for database operations.
   */
  constructor (private readonly AccountTypeRepository: AccountTypePrismaRepository) {}

  /**
   * Executes the process of retrieving the list of account types.
   *
   * @returns A promise that resolves to an array of AccountType entities.
   */
  public async execute (): Promise<AccountType[]> {
    return await this.AccountTypeRepository.getAccountsType()
  }
}
