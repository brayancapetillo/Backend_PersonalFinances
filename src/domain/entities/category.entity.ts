import { tcategoryName, tidCategoryType } from '@shared/types/category.type'

export class Category {
  public readonly id: number
  public readonly name: tcategoryName
  public readonly idCategoryType: tidCategoryType

  constructor (id: number, name: tcategoryName, idCategoryType: tidCategoryType) {
    this.id = id
    this.name = name
    this.idCategoryType = idCategoryType
  }
}
