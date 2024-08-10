import { categoryType as categoryTypePrisma } from '@prisma/client'
import { tcategoryType } from '@type/categoryType.type'

export interface categoryType extends Omit<categoryTypePrisma, 'name'> {
  name: tcategoryType
}
