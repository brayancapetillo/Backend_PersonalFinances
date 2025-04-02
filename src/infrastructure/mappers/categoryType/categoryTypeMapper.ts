// - Prisma's imports
import { categoryType as prismaCategoryType } from '@prisma/client'

// - Entity's imports
import { CategoryType } from '@domain/entities/categoryType.entity'

// - Type's imports
import { tcategoryType } from '@shared/types/categoryType.type'

/**
 * Converts a Prisma `categoryType` entity to a domain `CategoryType` entity.
 *
 * @param prismaCategoryType - The Prisma Client category type object.
 * @returns The corresponding `CategoryType` domain entity.
 */
export function toDomainCategoryType (prismaCategoryType: prismaCategoryType): CategoryType {
  return new CategoryType(prismaCategoryType.id, prismaCategoryType.name as tcategoryType)
}
