/**
 * @file bank.controller.ts
 * @description Controller for handling bank-related operations such as retrieving the list of banks and retrieving a bank by its ID.
 * This controller interacts with the respective use cases to perform the necessary business logic and send responses to the client.
 *
 * @module Controller/Bank
 */

// -Library and tool imports
import { Request, Response } from 'express'

// -Entity's import
import { Bank } from '@domain/entities/bank.entity'

// -Use Case's import
import { GetBanksUseCase } from '@application/use-cases/bank/getBanksUseCase'
import { GetBankUseCase } from '@application/use-cases/bank/getBankUseCase'

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
   * @param {GetBanksUseCase} getBanksUseCase - Use case for handling the retrieval of banks.
   * @param {GetBankUseCase} getBankUseCase - Use case for handling the retrieval of a bank by its ID.
   */
  constructor (
    private readonly getBanksUseCase: GetBanksUseCase,
    private readonly getBankUseCase: GetBankUseCase
  ) {}

  /**
   * Handles requests to retrieve the list of banks.
   *
   * @param {Request} _req - The HTTP request object.
   * @param {Response} res - The HTTP response object to send the result.
   */
  public async getBanks (_req: Request, res: Response): Promise<void> {
    try {
      const getBanks: Bank[] = await this.getBanksUseCase.execute()

      successResponseHttp<Bank[]>(res, { statusCode: successStatusCodes.OK, data: getBanks, message: 'return all banks' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }

  /**
   * Handles requests to retrieve a bank by its ID.
   *
   * @param {Request} req - The HTTP request object containing the bank ID as a parameter.
   * @param {Response} res - The HTTP response object to send the result.
   */
  public async getBank (req: Request, res: Response): Promise<void> {
    try {
      const bankId: number = Number(req.params.id)

      const bank: Bank = await this.getBankUseCase.execute(bankId)

      successResponseHttp<Bank>(res, { statusCode: successStatusCodes.OK, data: bank, message: 'bank successfully returned' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
