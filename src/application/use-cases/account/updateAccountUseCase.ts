/**
 * @file updateAccountUseCase.ts
 * @description This use case handles the logic for updating an existing account.
 * It validates the account's existence, checks for conflicts, and applies updates.
 *
 * @module UseCases/Account
 */
// -DTO's import
import { updateAccountDTO } from '@application/dtos/account/updateAccount.dto'

// -Entity's import
import { Account } from '@domain/entities/account.entity'

// -Repositories imports
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

/**
 * @class UpdateAccountUseCase
 * @description Use case for updating an existing account by its ID.
 */
export class UpdateAccountUseCase {
  /**
   * @constructor
   * @param {AccountPrismaRepository} AccountRepository - The repository for account data.
   */
  constructor (private readonly AccountRepository: AccountPrismaRepository) {}

  /**
   * @method execute
   * @description Executes the use case to update an account.
   * Validates the account's existence, checks for conflicts, and applies the updates.
   *
   * @param {number} accountId - The unique identifier of the account to be updated.
   * @param {updateAccountDTO} updateAccountDTO - The data transfer object containing the account updates.
   * @returns {Promise<Account>} A promise that resolves with the updated account.
   * @throws {HttpError} Throws an error if the account is not found or if there are conflicts with the account number.
   */
  public async execute (accountId: number, updateAccountDTO: updateAccountDTO): Promise<Account> {
    const account: Account | null = await this.AccountRepository.findById(accountId)
    if (account === null) throw new HttpError(clientErrorStatusCodes.NOT_FOUND, 'account not found')

    if (updateAccountDTO.accountNumber !== undefined) {
      const existAccountNumber: Account | null = await this.AccountRepository.findByAccountNumber(updateAccountDTO.accountNumber)
      if (existAccountNumber !== null && existAccountNumber.id !== accountId) throw new HttpError(clientErrorStatusCodes.CONFLICT, 'account number is already registered')
    }

    const dataUpdateAccount: updateAccountDTO = {
      name: updateAccountDTO.name ?? account.name,
      idBank: updateAccountDTO.idBank ?? account.idBank,
      idAccountType: updateAccountDTO.idAccountType ?? account.idAccountType,
      balance: updateAccountDTO.balance ?? account.balance,
      accountNumber: updateAccountDTO.accountNumber ?? account.accountNumber,
      updatedAt: new Date()
    }

    const updateAccount: Account = await this.AccountRepository.update(account.id, dataUpdateAccount)

    return updateAccount
  }
}
