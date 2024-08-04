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
import { lenguageCreate } from '@interfaces/lenguage.interface'
import { dataLenguage } from './data/lenguage'
import { sexTranslationCreate } from '@interfaces/translation/sexTranslation.interface'
import { dataSexTranslation } from './data/translation/sexTranslation'
import { accountTTranslationCreate } from '@interfaces/translation/accountTypeTranslation.interface'
import { dataAccountTTranslation } from './data/translation/accountTypeTranslation'
import { categoryTypeTranslationCreate } from '@interfaces/translation/categoryTypeTranslation.interface'
import { datacategoryTypeTranslations } from './data/translation/categoryTypeTranslation'

const prisma = new PrismaClient()

const insertDataLenguage = async (lenguage: lenguageCreate): Promise<void> => {
  try {
    await prisma.lenguage.create({ data: lenguage })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(lenguage)}: ${error as string}`))
  }
}

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

const insertDataSexTranslation = async (sexTranslation: sexTranslationCreate): Promise<void> => {
  try {
    await prisma.sexTranslation.create({ data: sexTranslation })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(sexTranslation)}: ${error as string}`))
  }
}

const insertDataAccountTTranslation = async (accountTTranslation: accountTTranslationCreate): Promise<void> => {
  try {
    await prisma.accountTypeTranslation.create({ data: accountTTranslation })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(accountTTranslation)}: ${error as string}`))
  }
}

const insertDataCategoryTypeTranslation = async (categoryTypeTranslation: categoryTypeTranslationCreate): Promise<void> => {
  try {
    await prisma.categoryTypeTranslation.create({ data: categoryTypeTranslation })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(categoryTypeTranslation)}: ${error as string}`))
  }
}

const main = async (): Promise<void> => {
  try {
    for (const lenguage of dataLenguage) { await insertDataLenguage(lenguage) }
    for (const sex of dataSex) { await insertDataSex(sex) }
    for (const bank of dataBank) { await insertDataBank(bank) }
    for (const accountType of dataAccountType) { await insertDataAccountType(accountType) }
    for (const categoryType of dataCategoryType) { await insertDataCategoryType(categoryType) }
    for (const category of dataCategory) { await insertDataCategory(category) }

    // translation
    for (const sexTranslation of dataSexTranslation) { await insertDataSexTranslation(sexTranslation) }
    for (const accountTTranslation of dataAccountTTranslation) { await insertDataAccountTTranslation(accountTTranslation) }
    for (const categoryTypeTranslation of datacategoryTypeTranslations) { await insertDataCategoryTypeTranslation(categoryTypeTranslation) }

    console.log(chalk.green('Data successfully inserted'))
  } catch (error) {
    console.error(chalk.red('An unexpected error occurred:'), error)
  } finally {
    await prisma.$disconnect()
  }
}

void main()
