/**
 * @file createcreateTransactionPFUseCase.ts
 * @description This use case handles the creation of a personal finance transaction.
 * It includes validation for the existence of the account and constructs a new transaction entity.
 *
 * @module UseCases/TransactionPF
 */
// -Entity imports
import { TransactionPF } from '@domain/entities/transactionPF.entity'
import { Account } from '@domain/entities/account.entity'

// -DTO imports
import { createTransactionPFDTO } from '@application/dtos/TransactionPF/createTransactionPF.dto'

// -Repository imports
import { TransactionPFPrismaRepository } from '@infrastructure/repositories/prisma/transactionPF/transactionPFPrismaRepository'
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

/**
 * CreateTransactionPFUseCase class
 *
 * This class implements the logic for creating a personal finance transaction.
 * It validates if the account exists in the repository and constructs a new transaction entity.
 */
export class CreateTransactionPFUseCase {
  /**
   * Constructs a CreateTransactionPFUseCase instance.
   *
   * @param {TransactionPFPrismaRepository} TransactionPFRepository - An instance of TransactionPFPrismaRepository for database operations.
   * @param {AccountPrismaRepository} AccountRepository - An instance of AccountPrismaRepository for account-related database operations.
   */
  constructor (
    private readonly TransactionPFRepository: TransactionPFPrismaRepository,
    private readonly AccountRepository: AccountPrismaRepository
  ) {}

  /**
   * Executes the transaction creation process.
   *
   * @param {createTransactionPFDTO} createTransactionPF - The data transfer object containing transaction details.
   * @returns {Promise<TransactionPF>} - A promise that resolves to a TransactionPF entity containing the created transaction's details.
   * @throws {HttpError} - HttpError if the account does not exist.
   */
  public async execute (createTransactionPF: createTransactionPFDTO): Promise<TransactionPF> {
    const existAccount: Account | null = await this.AccountRepository.findById(createTransactionPF.idAccount)
    if (existAccount === null) throw new HttpError(clientErrorStatusCodes.MISDIRECTED_REQUEST, 'invalid account in transaction')

    // TODO: Add validation for exist Category ans Transaction Type

    const transactionPF: TransactionPF = new TransactionPF(
      0,
      createTransactionPF.idCategory,
      createTransactionPF.idAccount,
      createTransactionPF.amount,
      new Date(createTransactionPF.transactionDate),
      createTransactionPF.idTransactionType,
      createTransactionPF.thirdParties,
      createTransactionPF.description,
      new Date()
    )

    return await this.TransactionPFRepository.create(transactionPF)
  }
}
