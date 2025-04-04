/**
 * @file category.controller.ts
 * @description Controller for handling category-related operations such as retrieving the list of categories.
 * This controller interacts with the respective use cases to perform the necessary business logic and send responses to the client.
 *
 * @module Controller/Category
 */

// -Library and tool imports
import { Request, Response } from 'express'

// -Entity's import
import { Category } from '@domain/entities/category.entity'

// -Use Case's import
import { GetCategoriesUseCase } from '@application/use-cases/category/getCategoriesUseCase'

// -Utility imports for HTTP responses and error handling
import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'

/**
 * CategoryController class handles the category-related processes.
 * It contains methods for retrieving category entities.
 */
export class CategoryController {
  /**
   * Creates an instance of CategoryController.
   * @param {GetCategoriesUseCase} getCategoriesUseCase - Use case for handling the retrieval of categories.
   */
  constructor (private readonly getCategoriesUseCase: GetCategoriesUseCase) {}

  /**
   * Handles requests to retrieve the list of categories.
   *
   * @param {Request} _req - The HTTP request object.
   * @param {Response} res - The HTTP response object to send the result.
   */
  public async getCategories (_req: Request, res: Response): Promise<void> {
    try {
      const getCategories: Category[] = await this.getCategoriesUseCase.execute()

      successResponseHttp<Category[]>(res, { statusCode: successStatusCodes.OK, data: getCategories, message: 'return all categories' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
