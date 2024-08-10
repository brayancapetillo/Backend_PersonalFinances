import { category as categoryPrisma } from '@prisma/client'
import { tcategoryName, tidCategoryType } from '@type/category.type'

export interface category extends Omit<categoryPrisma, 'name' | 'idCategoryType'> {
  name: tcategoryName
  idCategoryType: tidCategoryType
}
