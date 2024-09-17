import { CategoryType } from '@domain/entities/categoryType.entity'

export const dataCategoryType: Array<Pick<CategoryType, 'name'>> = [
  { name: 'Income' },
  { name: 'Fixed Expenses' },
  { name: 'Variable Expenses' },
  { name: 'Savings and Investments' },
  { name: 'Debts' },
  { name: 'Home' },
  { name: 'Health and Wellness' },
  { name: 'Education' },
  { name: 'Pets' },
  { name: 'Donations and Charity' },
  { name: 'Taxes' },
  { name: 'Leisure and Vacations' },
  { name: 'Technology' }
]
