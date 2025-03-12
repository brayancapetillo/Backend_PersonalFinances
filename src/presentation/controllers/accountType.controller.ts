/**
 * @file accountType.controller.ts
 * @description Controller for handling operations related to account types, such as retrieving the list of account types.
 * This controller interacts with the respective use cases to perform the necessary business logic and send responses to the client.
 *
 * @module Controller/AccountType
 */
// -Library and tool imports
import { Request, Response } from 'express'

// -Entity's import
import { AccountType } from '@domain/entities/accountType.entity'

// -Use Case's import
import { GetAccountsTypeUseCase } from '@application/use-cases/accountType/getAccountsTypeUseCase'

// -Utility imports for HTTP responses and error handling
import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'

/**
 * AccountTypeController class handles processes related to account types.
 * It contains methods for retrieving AccountType entities.
 */
export class AccountTypeController {
  /**
   * Creates an instance of AccountTypeController.
   * @param {GetAccountsTypeUseCase} getAccountsTypeUseCase - Use case for handling the retrieval of account types.
   */
  constructor (private readonly getAccountsTypeUseCase: GetAccountsTypeUseCase) {}

  /**
   * Handles requests to retrieve the list of account types.
   *
   * @param {Request} _req - The HTTP request object.
   * @param {Response} res - The HTTP response object to send the result.
   */
  public async getAccountsType (_req: Request, res: Response): Promise<void> {
    try {
      const getAccountsType: AccountType[] = await this.getAccountsTypeUseCase.execute()

      successResponseHttp<AccountType[]>(res, { statusCode: successStatusCodes.OK, data: getAccountsType, message: 'return all banks' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
