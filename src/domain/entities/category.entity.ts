import { tcategoryName, tidCategoryType } from '@shared/types/category.type'
import { CategoryType } from './categoryType.entity'

export class Category {
  constructor (
    public readonly id: number,
    public readonly name: tcategoryName,
    public readonly idCategoryType: tidCategoryType,
    public categoryType?: CategoryType
  ) {}
}
