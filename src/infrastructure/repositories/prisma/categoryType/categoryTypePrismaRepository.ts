/**
 * @file categoryTypePrismaRepository.ts
 * @description Repository class for managing CategoryType entities using Prisma as the ORM.
 * This class implements the CategoryTypeRepository interface and provides methods for
 * interacting with the category_type table in the database.
 *
 * @module Repositories/CategoryType
 */

// -Entity's import
import { CategoryType } from '@domain/entities/categoryType.entity'

// -Interfaces import
import { ICategoryTypeRepository } from '@domain/interfaces/categoryTypeRepository'

// -Mapper's import
import { toDomainCategoryType } from '@infrastructure/mappers/categoryType/categoryTypeMapper'

// -Prisma's import
import { categoryType as prismaCategoryType, PrismaClient } from '@prisma/client'

/**
 * CategoryTypePrismaRepository class for handling database operations related to CategoryType entities.
 * This class implements the CategoryTypeRepository interface, providing methods for
 * retrieving CategoryType entities in the database.
 */
export class CategoryTypePrismaRepository implements ICategoryTypeRepository {
  private readonly prisma: PrismaClient

  /**
   * Constructor for CategoryTypePrismaRepository.
   *
   * @param {PrismaClient} prisma - An instance of PrismaClient for database operations.
   */
  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  /**
   * Retrieves the list of category types from the database.
   *
   * @returns {Promise<CategoryType[]>} A promise that resolves to an array of CategoryType entities.
   */
  public async getCategoriesType (): Promise<CategoryType[]> {
    const categoryType: prismaCategoryType[] = await this.prisma.categoryType.findMany()
    return categoryType.map((categoryType: prismaCategoryType) => toDomainCategoryType(categoryType))
  }
}
