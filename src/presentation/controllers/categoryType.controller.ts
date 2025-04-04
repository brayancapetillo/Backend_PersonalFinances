/**
 * @file categoryType.controller.ts
 * @description Controller for handling category type-related operations such as retrieving the list of category types.
 * This controller interacts with the respective use cases to perform the necessary business logic and send responses to the client.
 *
 * @module Controller/CategoryType
 */

// -Library and tool imports
import { Request, Response } from 'express'

// -Entity's import
import { CategoryType } from '@domain/entities/categoryType.entity'

// -Use Case's import
import { GetCategoriesTypeUseCase } from '@application/use-cases/categoryType/getCategoriesTypeUseCase'

// -Utility imports for HTTP responses and error handling
import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'

/**
 * CategoryTypeController class handles the category type-related processes.
 * It contains methods for retrieving category type entities.
 */
export class CategoryTypeController {
  /**
   * Creates an instance of CategoryTypeController.
   * @param {GetCategoriesTypeUseCase} getCategoriesTypeUseCase - Use case for handling the retrieval of category types.
   */
  constructor (private readonly getCategoriesTypeUseCase: GetCategoriesTypeUseCase) {}

  /**
   * Handles requests to retrieve the list of category types.
   *
   * @param {Request} _req - The HTTP request object.
   * @param {Response} res - The HTTP response object to send the result.
   */
  public async getCategoriesType (_req: Request, res: Response): Promise<void> {
    try {
      const categoriesType: CategoryType[] = await this.getCategoriesTypeUseCase.execute()

      successResponseHttp<CategoryType[]>(res, { statusCode: successStatusCodes.OK, data: categoriesType, message: 'return all categories type' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
