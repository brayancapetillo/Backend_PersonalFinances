import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'

import { dataSex } from './data/sex'
import { sexCreate } from '@interfaces/sex.interface'
import { bankCreate } from '@interfaces/bank.interface'
import { dataBank } from './data/bank'
import { accountTypeCreate } from '@interfaces/accountType.interface'
import { dataAccountType } from './data/accountType'
import { categoryTypeCreate } from '@interfaces/categoryType.interface'
import { dataCategoryType } from './data/categoryType'
import { categoryCreate } from '@interfaces/category.interface'
import { dataCategory } from './data/category'

const prisma = new PrismaClient()

const insertDataSex = async (sex: sexCreate): Promise<void> => {
  try {
    await prisma.sex.create({ data: sex })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(sex)}: ${error as string}`))
  }
}

const insertDataBank = async (bank: bankCreate): Promise<void> => {
  try {
    await prisma.bank.create({ data: bank })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(bank)}: ${error as string}`))
  }
}

const insertDataAccountType = async (accountType: accountTypeCreate): Promise<void> => {
  try {
    await prisma.accountType.create({ data: accountType })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(accountType)}: ${error as string}`))
  }
}

const insertDataCategoryType = async (categoryType: categoryTypeCreate): Promise<void> => {
  try {
    await prisma.categoryType.create({ data: categoryType })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(categoryType)}: ${error as string}`))
  }
}

const insertDataCategory = async (category: categoryCreate): Promise<void> => {
  try {
    await prisma.category.create({ data: category })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(category)}: ${error as string}`))
  }
}

const main = async (): Promise<void> => {
  try {
    for (const sex of dataSex) { await insertDataSex(sex) }
    for (const bank of dataBank) { await insertDataBank(bank) }
    for (const accountType of dataAccountType) { await insertDataAccountType(accountType) }
    for (const categoryType of dataCategoryType) { await insertDataCategoryType(categoryType) }
    for (const category of dataCategory) { await insertDataCategory(category) }

    console.log(chalk.green('Data successfully inserted'))
  } catch (error) {
    console.error(chalk.red('An unexpected error occurred:'), error)
  } finally {
    await prisma.$disconnect()
  }
}

void main()
