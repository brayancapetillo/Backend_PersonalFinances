import { category } from '@domain/interfaces/category.interface'

export type categoryCreate = Pick<category, 'name' | 'idCategoryType'>
