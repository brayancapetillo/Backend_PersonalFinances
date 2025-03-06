/**
 * @file bank.controller.ts
 * @description Controller for handling bank-related operations such as retrieving the list of banks.
 * This controller interacts with the respective use cases to perform the necessary business logic and send responses to the client.
 *
 * @module Controller/Bank
 */

// -Library and tool imports
import { Request, Response } from 'express'

// -Entity's import
import { Bank } from '@domain/entities/bank.entity'

// -Use Case's import
import { GetBanksUseCase } from '@application/use-cases/bank/GetBanksUseCase'

// -Utility imports for HTTP responses and error handling
import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'

/**
 * BankController class handles the bank-related processes.
 * It contains methods for retrieving bank entities.
 */
export class BankController {
  /**
   * Creates an instance of BankController.
   * @param getBanksUseCase - Use case for handling the retrieval of banks.
   */
  constructor (private readonly getBanksUseCase: GetBanksUseCase) {}

  /**
   * Handles requests to retrieve the list of banks.
   *
   * @param _req - The HTTP request object.
   * @param res - The HTTP response object to send the result.
   */
  public async getBanks (_req: Request, res: Response): Promise<void> {
    try {
      const getBanks: Bank[] = await this.getBanksUseCase.execute()

      successResponseHttp<Bank[]>(res, { statusCode: successStatusCodes.OK, data: getBanks, message: 'return all banks' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
