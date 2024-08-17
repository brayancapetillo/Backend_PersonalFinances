import { tcategoryType } from '@shared/types/categoryType.type'

export class CategoryType {
  public readonly id: number
  public readonly name: tcategoryType

  constructor (id: number, name: tcategoryType) {
    this.id = id
    this.name = name
  }
}
