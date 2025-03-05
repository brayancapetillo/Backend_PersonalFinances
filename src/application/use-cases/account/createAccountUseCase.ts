/**
 * @file createAccountUseCase.ts
 * @description This use case handles the create account logic,
 * allowing users to create accounts if not exist errors of data
 * input and retrieves data account created.
 *
 * @module UseCases/Account
 */

// -DTO's import
import { createAccountDTO } from '@application/dtos/account/createAccount.dto'

// -Repository's import
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'

// -Entity's import
import { Account } from '@domain/entities/account.entity'
import { UserPF } from '@domain/entities/userPF.entity'

// -Utility's import for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

/**
 * @class CreateAccountUseCase
 * @description Use case for creating a new account.
 */
export class CreateAccountUseCase {
  /**
   * @constructor
   * @param {AccountPrismaRepository} AccountRepository - The repository for account data.
   * @param {UserPFPrismaRepository} UserPFRepository - The repository for user data.
   */
  constructor (
    private readonly AccountRepository: AccountPrismaRepository,
    private readonly UserPFRepository: UserPFPrismaRepository
  ) {}

  /**
   * @method execute
   * @description Executes the use case to create an account.
   * Validates the user and account number before creating the account.
   *
   * @param {createAccountDTO} createAccountDTO - Data transfer object containing account creation data.
   * @returns {Promise<Account>} The created account.
   * @throws {HttpError} Throws an error if the user ID is invalid or the account number is already registered.
   */
  public async execute (createAccountDTO: createAccountDTO): Promise<Account> {
    const user: UserPF | null = await this.UserPFRepository.findById(createAccountDTO.idUser)
    if (user === null) throw new HttpError(clientErrorStatusCodes.UNPROCESSABLE_ENTITY, 'invalid user Id')

    const existAccount: Account | null = await this.AccountRepository.findByAccountNumber(createAccountDTO.accountNumber)
    if (existAccount !== null) throw new HttpError(clientErrorStatusCodes.CONFLICT, 'account number is already registered')

    // TODO: Add validation for existe bank, accountType, if accountType is credit validate creditUsed, creditLimit, cutOffDate, paymentDueDate

    const account: Account = new Account(
      0,
      createAccountDTO.idUser,
      createAccountDTO.name,
      createAccountDTO.idBank,
      createAccountDTO.idAccountType,
      createAccountDTO.balance,
      createAccountDTO.accountNumber,
      new Date(),
      new Date(),
      createAccountDTO.creditUsed,
      createAccountDTO.creditLimit,
      createAccountDTO.cutOffDate,
      createAccountDTO.paymentDueDate
    )

    return await this.AccountRepository.create(account)
  }
}
