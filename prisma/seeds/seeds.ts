// -Import necessary modules
import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'

// -Data Imports
import { dataCategoryType } from './data/categoryType'
import { dataAccountType } from './data/accountType'
import { dataCategory } from './data/category'
import { dataLenguage } from './data/lenguage'
import { dataBank } from './data/bank'
import { dataSex } from './data/sex'

// -Translation data imports
import { datacategoryTypeTranslation } from './data/translation/categoryTypeTranslation'
import { dataAccountTTranslation } from './data/translation/accountTypeTranslation'
import { dataCategoryTranslation } from './data/translation/categoryTranslation'
import { dataSexTranslation } from './data/translation/sexTranslation'

// -Interface imports
import { categoryTypeCreate } from '@interfaces/categoryType.interface'
import { accountTypeCreate } from '@interfaces/accountType.interface'
import { categoryCreate } from '@interfaces/category.interface'
import { lenguageCreate } from '@interfaces/lenguage.interface'
import { bankCreate } from '@interfaces/bank.interface'
import { sexCreate } from '@interfaces/sex.interface'

// -Translation interface imports
import { categoryTypeTranslationCreate } from '@interfaces/translation/categoryTypeTranslation.interface'
import { accountTTranslationCreate } from '@interfaces/translation/accountTypeTranslation.interface'
import { categoryTranslationCreate } from '@interfaces/translation/categoryTranslation.interface'
import { sexTranslationCreate } from '@interfaces/translation/sexTranslation.interface'

// Instantiate Prisma Client to interact with the database
const prisma = new PrismaClient()

/**
 * Inserts a lenguage record in database.
 * @param {lenguageCreate} lenguage - Lenguage data to be inserted.
 * @returns {Promise<void>} - A promise that resolves when insertion is complete.
 */
const insertDataLenguage = async (lenguage: lenguageCreate): Promise<void> => {
  try {
    await prisma.lenguage.create({ data: lenguage })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(lenguage)}: ${error as string}`))
  }
}

/**
 * Insert a sex record in database.
 * @param {sexCreate} sex - Sex data to be inserted.
 * @returns {Promise<void>} - A promise that resolves when insertion is complete.
 */
const insertDataSex = async (sex: sexCreate): Promise<void> => {
  try {
    await prisma.sex.create({ data: sex })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(sex)}: ${error as string}`))
  }
}

/**
 * Insert a bank record in database.
 * @param {bankCreate} bank - Bank data to be inserted.
 * @returns {Promise<void>} - A promise that resolves when insertion is complete.
 */
const insertDataBank = async (bank: bankCreate): Promise<void> => {
  try {
    await prisma.bank.create({ data: bank })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(bank)}: ${error as string}`))
  }
}

/**
 * Insert a account type record in database.
 * @param {accountTypeCreate} accountType - Account type data to be inserted.
 * @returns {Promise<void>} - A promise that resolves when insertion is complete.
 */
const insertDataAccountType = async (accountType: accountTypeCreate): Promise<void> => {
  try {
    await prisma.accountType.create({ data: accountType })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(accountType)}: ${error as string}`))
  }
}

/**
 * Insert category Type record in database.
 * @param {categoryTypeCreate} categoryType - Category type data to be inserted.
 * @returns {Promise<void>} - A promise that resolves when insertion is complete.
 */
const insertDataCategoryType = async (categoryType: categoryTypeCreate): Promise<void> => {
  try {
    await prisma.categoryType.create({ data: categoryType })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(categoryType)}: ${error as string}`))
  }
}

/**
 * Insert category record in database.
 * @param {categoryCreate} category - Category data to be inserted.
 * @returns {Promise<void>} - A promise that resolves when insertion is complete.
 */
const insertDataCategory = async (category: categoryCreate): Promise<void> => {
  try {
    await prisma.category.create({ data: category })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(category)}: ${error as string}`))
  }
}

/**
 * Insert sex Translation record in database.
 * @param {sexTranslationCreate} sexTranslation - sex Translation data to be inserted.
 * @returns {Promise<void>} - A promise that resolves when insertion is complete.
 */
const insertDataSexTranslation = async (sexTranslation: sexTranslationCreate): Promise<void> => {
  try {
    await prisma.sexTranslation.create({ data: sexTranslation })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(sexTranslation)}: ${error as string}`))
  }
}

/**
 * Insert account type Translation record in database.
 * @param {accountTTranslationCreate} accountTTranslation - account Translation data to be inserted.
 * @returns {Promise<void>} - A promise that resolves when insertion is complete.
 */
const insertDataAccountTTranslation = async (accountTTranslation: accountTTranslationCreate): Promise<void> => {
  try {
    await prisma.accountTypeTranslation.create({ data: accountTTranslation })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(accountTTranslation)}: ${error as string}`))
  }
}

/**
 * Insert category Type Translation record in database.
 * @param {categoryTypeTranslationCreate} categoryTypeTranslation - category Type Translation data to be inserted.
 * @returns {Promise<void>} - A promise that resolves when insertion is complete.
 */
const insertDataCategoryTypeTranslation = async (categoryTypeTranslation: categoryTypeTranslationCreate): Promise<void> => {
  try {
    await prisma.categoryTypeTranslation.create({ data: categoryTypeTranslation })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(categoryTypeTranslation)}: ${error as string}`))
  }
}

/**
 * Insert category Translation record in database.
 * @param {categoryTranslationCreate} categoryTranslation - category  Translation data to be inserted.
 * @returns {Promise<void>} - A promise that resolves when insertion is complete.
 */
const insertDataCategoryTranslation = async (categoryTranslation: categoryTranslationCreate): Promise<void> => {
  try {
    await prisma.categoryTranslation.create({ data: categoryTranslation })
  } catch (error) {
    console.log(error)
    console.error(chalk.red(`Failed to insert ${JSON.stringify(categoryTranslation)}: ${error as string}`))
  }
}

/**
 * main function to insert all data into the database.
 * @returns {Promise<void>} - A promise that resolves when all data insertion is complete.
 */
const main = async (): Promise<void> => {
  try {
    // Insert language data
    for (const lenguage of dataLenguage) { await insertDataLenguage(lenguage) }
    console.log(chalk.hex('#b9bbbf')('seed data') + chalk.hex('#dbc8a7').bold(' lenguage ') + chalk.hex('#b9bbbf')('inserted'))

    // Insert sex data
    for (const sex of dataSex) { await insertDataSex(sex) }
    console.log(chalk.hex('#b9bbbf')('seed data') + chalk.hex('#dbc8a7').bold(' sex ') + chalk.hex('#b9bbbf')('inserted'))

    // Insert bank data
    for (const bank of dataBank) { await insertDataBank(bank) }
    console.log(chalk.hex('#b9bbbf')('seed data') + chalk.hex('#dbc8a7').bold(' bank ') + chalk.hex('#b9bbbf')('inserted'))

    // Insert account type data
    for (const accountType of dataAccountType) { await insertDataAccountType(accountType) }
    console.log(chalk.hex('#b9bbbf')('seed data') + chalk.hex('#dbc8a7').bold(' accontType ') + chalk.hex('#b9bbbf')('inserted'))

    // Insert category type data
    for (const categoryType of dataCategoryType) { await insertDataCategoryType(categoryType) }
    console.log(chalk.hex('#b9bbbf')('seed data') + chalk.hex('#dbc8a7').bold(' categoryType ') + chalk.hex('#b9bbbf')('inserted'))

    // Insert category data
    for (const category of dataCategory) { await insertDataCategory(category) }
    console.log(chalk.hex('#b9bbbf')('seed data') + chalk.hex('#dbc8a7').bold(' category ') + chalk.hex('#b9bbbf')('inserted'))

    // Insert translations
    for (const sexTranslation of dataSexTranslation) { await insertDataSexTranslation(sexTranslation) }
    console.log(chalk.hex('#b9bbbf')('seed data') + chalk.hex('#dbc8a7').bold(' sexTranslation ') + chalk.hex('#b9bbbf')('inserted'))

    for (const accountTTranslation of dataAccountTTranslation) { await insertDataAccountTTranslation(accountTTranslation) }
    console.log(chalk.hex('#b9bbbf')('seed data') + chalk.hex('#dbc8a7').bold(' accountTTranslation ') + chalk.hex('#b9bbbf')('inserted'))

    for (const categoryTypeTranslation of datacategoryTypeTranslation) { await insertDataCategoryTypeTranslation(categoryTypeTranslation) }
    console.log(chalk.hex('#b9bbbf')('seed data') + chalk.hex('#dbc8a7').bold(' categoryTypeTranslation ') + chalk.hex('#b9bbbf')('inserted'))

    for (const categoryTranslation of dataCategoryTranslation) { await insertDataCategoryTranslation(categoryTranslation) }
    console.log(chalk.hex('#b9bbbf')('seed data') + chalk.hex('#dbc8a7').bold(' categoryTranslation ') + chalk.hex('#b9bbbf')('inserted'))

    // Success message after data insertion
    console.log(chalk.hex('#b9bbbf')('All seed data') + chalk.hex('#0bd18a').bold(' successfully ') + chalk.hex('#b9bbbf')('inserted'))
  } catch (error) {
    // Handle unexpected errors
    console.error(chalk.red('An unexpected error occurred:'), error)
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect()
  }
}

// Execute the main function
void main()
