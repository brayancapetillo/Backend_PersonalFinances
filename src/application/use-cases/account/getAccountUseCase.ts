/**
 * @file getAccountUseCase.ts
 * @description This use case handles the logic for retrieving an account.
 * It validates the account's existence and returns the account data if found.
 *
 * @module UseCases/Account
 */

// -Entity's import
import { Account } from '@domain/entities/account.entity'

// -Repository's import
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'

// -Utility's import for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

/**
 * @class GetAccountUseCase
 * @description Use case for retrieving an account by its ID.
 */
export class GetAccountUseCase {
  constructor (
    /**
   * @constructor
   * @param {AccountPrismaRepository} AccountRepository - The repository for account data.
   */
    private readonly AccountRepository: AccountPrismaRepository
  ) {}

  /**
   * @method execute
   * @description Executes the use case to retrieve an account.
   * Validates the account's existence and returns the account data.
   *
   * @param {number} accountId - The unique identifier of the account to be retrieved.
   * @returns {Promise<Account>} A promise that resolves with the retrieved account.
   * @throws {HttpError} Throws an error if the account is not found.
   */
  public async execute (accountId: number): Promise<Account> {
    const account: Account | null = await this.AccountRepository.findById(accountId)
    if (account === null) throw new HttpError(clientErrorStatusCodes.NOT_FOUND, 'account not found')

    return account
  }
}
