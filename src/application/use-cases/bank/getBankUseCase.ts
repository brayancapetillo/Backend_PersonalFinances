/**
 * @file GetBankUseCase.ts
 * @description This use case handles the process of retrieving a bank by its ID from the database.
 *
 * @module UseCases/Bank
 */

// -Entity's import
import { Bank } from '@domain/entities/bank.entity'

// -Repositories imports
import { BankPrismaRepository } from '@infrastructure/repositories/prisma/bank/bankPrismaRepository'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

/**
 * GetBankUseCase class
 *
 * This class implements the logic for retrieving a bank by its ID.
 */
export class GetBankUseCase {
  /**
   * Constructs a GetBankUseCase instance.
   *
   * @param BankRepository - An instance of BankPrismaRepository for database operations.
   */
  constructor (private readonly BankRepository: BankPrismaRepository) {}

  /**
   * Executes the process of retrieving a bank by its ID.
   *
   * @param {number} id - The ID of the bank to retrieve.
   * @returns {Promise<Bank>} A promise that resolves to a Bank entity if found.
   * @throws {HttpError} If the bank is not found, it throws a 404 error with the message 'bank not found'.
   */
  public async execute (id: number): Promise<Bank> {
    const bank: Bank | null = await this.BankRepository.getBankById(id)
    if (bank === null) throw new HttpError(clientErrorStatusCodes.NOT_FOUND, 'bank not found')

    return bank
  }
}
