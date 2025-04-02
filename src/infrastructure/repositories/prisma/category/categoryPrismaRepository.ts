/**
 * @file categoryPrismaRepository.ts
 * @description Repository class for managing Category entities using Prisma as the ORM.
 * This class implements the CategoryRepository interface and provides methods for
 * interacting with the category table in the database.
 *
 * @module Repositories/Category
 */

// -Entity's import
import { ICategoryRepository } from '@domain/interfaces/categoryRepository'
import { Category } from '@domain/entities/category.entity'

// -Prisma's import
import { category as prismaCategory, PrismaClient } from '@prisma/client'

// -Mapper's import
import { toDomainCategory } from '@infrastructure/mappers/category/categoryMapper'

/**
 * CategoryPrismaRepository class for handling database operations related to Category entities.
 * This class implements the CategoryRepository interface, providing methods for
 * retrieving Category entities in the database.
 */
export class CategoryPrismaRepository implements ICategoryRepository {
  private readonly prisma: PrismaClient

  /**
   * Constructor for TransactionPFPrismaRepository.
   *
   * @param {PrismaClient} prisma - An instance of PrismaClient for database operations.
   */
  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  /**
   * Retrieves the list of categories from the database, including category type details.
   *
   * @returns {Promise<Category[]>} A promise that resolves to an array of Category entities.
   */
  public async getCategories (): Promise<Category[]> {
    const categories: prismaCategory[] = await this.prisma.category.findMany({ include: { categoryType: true } })
    return categories.map((category: prismaCategory) => toDomainCategory(category))
  }
}
