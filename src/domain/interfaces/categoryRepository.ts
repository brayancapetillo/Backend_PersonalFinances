import { Category } from '@domain/entities/category.entity'

export interface ICategoryRepository {
  getCategories: () => Promise<Category[]>
}
