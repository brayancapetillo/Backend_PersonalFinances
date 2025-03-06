/**
 * @file GetBanksUseCase.ts
 * @description This use case handles the process of retrieving the list of banks from the database.
 *
 * @module UseCases/Bank
 */

// -Entity's import
import { Bank } from '@domain/entities/bank.entity'

// -Repositories imports
import { BankPrismaRepository } from '@infrastructure/repositories/prisma/bank/bankPrismaRepository'

/**
 * GetBanksUseCase class
 *
 * This class implements the logic for retrieving the list of banks.
 */
export class GetBanksUseCase {
  /**
   * Constructs a GetBanksUseCase instance.
   *
   * @param BankRepository - An instance of BankPrismaRepository for database operations.
   */
  constructor (
    private readonly BankRepository: BankPrismaRepository
  ) {}

  /**
   * Executes the process of retrieving the list of banks.
   *
   * @returns A promise that resolves to an array of Bank entities.
   */
  public async execute (): Promise<Bank[]> {
    return await this.BankRepository.getBanks()
  }
}
