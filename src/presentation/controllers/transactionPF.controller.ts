/**
 * @file transactionPF.controller.ts
 * @description Controller for handling TransactionPF-related operations such as creating a new transaction.
 * This controller interacts with the respective use cases to perform the necessary business logic and send responses to the client.
 *
 * @module Controller/TransactionPF
 */

// -Library and tool imports
import { Request, Response } from 'express'

// -Entity's import
import { TransactionPF } from '@domain/entities/transactionPF.entity'

// -DTO import
import { createTransactionPFDTO } from '@application/dtos/TransactionPF/createTransactionPF.dto'

// -Use Case's import
import { CreateTransactionPFUseCase } from '@application/use-cases/TransactionPF/createcreateTransactionPFUseCase'

// -Utility imports for HTTP responses and error handling
import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'

/**
 * TransactionPFController class handles the TransactionPF-related processes.
 * It contains methods for creating TransactionPF entities.
 */
export class TransactionPFController {
  /**
   * Creates an instance of TransactionPFController.
   * @param {CreateTransactionPFUseCase} createTransactionPFUseCase - Use case for creating a TransactionPF.
   */
  constructor (private readonly createTransactionPFUseCase: CreateTransactionPFUseCase) {}

  /**
   * Handles the creation of a new TransactionPF.
   *
   * @param {Request} req - The HTTP request object containing the transaction data in the body.
   * @param {Response} res - The HTTP response object to send the result.
   */
  public async createTransactionPF (req: Request, res: Response): Promise<void> {
    try {
      const createTransactionPFDTO: createTransactionPFDTO = req.body

      const resCreateTransactionPF: TransactionPF = await this.createTransactionPFUseCase.execute(createTransactionPFDTO)

      successResponseHttp<TransactionPF>(res, { statusCode: successStatusCodes.CREATED, data: resCreateTransactionPF, message: 'transaction successfully created' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
