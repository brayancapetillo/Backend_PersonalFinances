import { CategoryType } from '@domain/entities/categoryType.entity'

export interface ICategoryTypeRepository {
  getCategoriesType: () => Promise<CategoryType[]>
}
