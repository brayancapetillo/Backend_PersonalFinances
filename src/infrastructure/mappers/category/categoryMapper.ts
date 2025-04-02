// - Prisma's imports
import { categoryType as prismacategoryType, category as prismaCategory } from '@prisma/client'

// - Entity's imports
import { Category } from '@domain/entities/category.entity'

// - Type's imports
import { tcategoryName, tidCategoryType } from '@shared/types/category.type'
import { toDomainCategoryType } from '../categoryType/categoryTypeMapper'

/**
 * Converts a Prisma category entity to a domain Category entity.
 *
 * @param {prismaCategory} prismaCategory - The Prisma Client category object, optionally including its category type.
 * @returns {Category} - The corresponding `Category` domain entity.
 */
export function toDomainCategory (prismaCategory: (prismaCategory & { categoryType?: prismacategoryType })): Category {
  return new Category(
    prismaCategory.id,
    prismaCategory.name as tcategoryName,
    prismaCategory.idCategoryType as tidCategoryType,
    prismaCategory.categoryType != null ? toDomainCategoryType(prismaCategory.categoryType) : undefined
  )
}
