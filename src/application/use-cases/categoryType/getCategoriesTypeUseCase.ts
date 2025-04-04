/**
 * @file GetCategoriesTypeUseCase.ts
 * @description This use case handles the process of retrieving the list of category types from the database.
 *
 * @module UseCases/CategoryType
 */

// -Entity's import
import { CategoryType } from '@domain/entities/categoryType.entity'

// -Repositories imports
import { CategoryTypePrismaRepository } from '@infrastructure/repositories/prisma/categoryType/categoryTypePrismaRepository'

/**
 * GetCategoriesTypeUseCase class
 *
 * This class implements the logic for retrieving the list of category types.
 */
export class GetCategoriesTypeUseCase {
  /**
   * Constructs a GetCategoriesTypeUseCase instance.
   *
   * @param {CategoryTypePrismaRepository} categoryTypeRepository - An instance of CategoryTypePrismaRepository for database operations.
   */
  constructor (private readonly categoryTypeRepository: CategoryTypePrismaRepository) {}

  /**
   * Executes the process of retrieving the list of category types.
   *
   * @returns {CategoryType[]} A promise that resolves to an array of CategoryType entities.
   */
  public async execute (): Promise<CategoryType[]> {
    return await this.categoryTypeRepository.getCategoriesType()
  }
}
