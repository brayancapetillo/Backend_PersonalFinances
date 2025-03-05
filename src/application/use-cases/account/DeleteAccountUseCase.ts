/**
 * @file deleteAccountUseCase.ts
 * @description This use case handles the logic for deleting an account.
 * It validates the account existence before proceeding with the deletion.
 *
 * @module UseCases/Account
 */

// -Entity's import
import { Account } from '@domain/entities/account.entity'

// -Repositories imports
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

/**
 * @class DeleteAccountUseCase
 * @description Use case for deleting an account by its ID.
 */
export class DeleteAccountUseCase {
  /**
   * @constructor
   * @param {AccountPrismaRepository} AccountRepository - The repository for account data.
   */
  constructor (private readonly AccountRepository: AccountPrismaRepository) {}

  /**
   * @method execute
   * @description Executes the use case to delete an account.
   * Validates the account's existence before deletion.
   *
   * @param {number} accountId - The unique identifier of the account to be deleted.
   * @returns {Promise<void>} A promise that resolves when the account is successfully deleted.
   * @throws {HttpError} Throws an error if the account is not found.
   */
  public async execute (accountId: number): Promise<void> {
    const account: Account | null = await this.AccountRepository.findById(accountId)
    if (account === null) throw new HttpError(clientErrorStatusCodes.NOT_FOUND, 'account not found')

    await this.AccountRepository.delete(accountId)
  }
}
