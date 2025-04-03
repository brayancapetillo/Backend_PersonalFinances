/**
 * @file GetCategoriesUseCase.ts
 * @description This use case handles the process of retrieving the list of categories from the database.
 *
 * @module UseCases/Category
 */

// -Entity's import
import { Category } from '@domain/entities/category.entity'

// -Repositories imports
import { CategoryPrismaRepository } from '@infrastructure/repositories/prisma/category/categoryPrismaRepository'

/**
 * GetCategoriesUseCase class
 *
 * This class implements the logic for retrieving the list of categories.
 */
export class GetCategoriesUseCase {
  /**
   * Constructs a GetCategoriesUseCase instance.
   *
   * @param {CategoryPrismaRepository} categoryRepository - An instance of CategoryPrismaRepository for database operations.
   */
  constructor (private readonly categoryRepository: CategoryPrismaRepository) {}

  /**
   * Executes the process of retrieving the list of categories.
   *
   * @returns {Category[]} A promise that resolves to an array of Category entities.
   */
  public async execute (): Promise<Category[]> {
    return await this.categoryRepository.getCategories()
  }
}
