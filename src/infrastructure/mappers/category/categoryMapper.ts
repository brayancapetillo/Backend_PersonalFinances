// - Prisma's imports
import { category as prismaCategory } from '@prisma/client'

// - Entity's imports
import { Category } from '@domain/entities/category.entity'

// - Type's imports
import { tcategoryName, tidCategoryType } from '@shared/types/category.type'

/**
 * Converts a Prisma category entity to a domain Category entity.
 *
 * @param {prismaCategory} prismaCategory - The category from Prisma Client.
 * @returns {Category} - The mapped Category entity.
 */
export function toDomainCategory (prismaCategory: prismaCategory): Category {
  return new Category(prismaCategory.id, prismaCategory.name as tcategoryName, prismaCategory.idCategoryType as tidCategoryType)
}
