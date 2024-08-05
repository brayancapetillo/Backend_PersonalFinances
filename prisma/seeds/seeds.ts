// -Import necessary modules
import { accountType, accountTypeTranslation, bank, category, categoryTranslation, categoryType, categoryTypeTranslation, lenguage, PrismaClient, sex, sexTranslation } from '@prisma/client'
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
 * Insert an array of data into database using a specefied create function.
 *
 * @param {T[]} data - The array of data items to be inserted.
 * @param {(item:T)=>Promise<R>} create - the function used to insert each data item into database.
 * @param {string} typeName - The name of data type being insert (for loggin purposes).
 * @template T - The type of data being inserted.
 * @template R - The type of the result returned by created function.
 * @returns {Promise<void>} - A promise that resolves when all data has been inserted.
 */
const insertData = async <T, R>(data: T[], create: (item: T) => Promise<R>, typeName: string): Promise<void> => {
  try {
    // Loop through each data item and insert it using the create function
    for (const item of data) {
      await create(item)
    }

    // Log a success message when all data has been inserted
    console.log(chalk.hex('#b9bbbf')('Seed data') + chalk.hex('#dbc8a7').bold(` ${typeName} `) + chalk.hex('#b9bbbf')('inserted')
    )
  } catch (error) {
    // Log an error message if insertion fails
    console.error(chalk.red(`Failed to insert ${typeName}: ${error as string}`)
    )
  }
}
/**
 * main function to insert all seeds into the database.
 *
 * This function handles the insertion of data for various database entities,
 * including languages, sexes, banks, account types, categories, and their translations.
 *
 * It uses the `insertData` function to insert data into the database and provides
 * detailed logging messages about the progress and status of the operation.
 *
 * @returns {Promise<void>} - A promise that resolves when all data seed has been inserted.
 */
const main = async (): Promise<void> => {
  try {
    // Insert language data
    await insertData<lenguageCreate, lenguage>(dataLenguage, async (data) => await prisma.lenguage.create({ data }), 'lenguage')

    // Insert sex data
    await insertData<sexCreate, sex>(dataSex, async (data) => await prisma.sex.create({ data }), 'sex')

    // Insert bank data
    await insertData<bankCreate, bank>(dataBank, async (data) => await prisma.bank.create({ data }), 'bank')

    // Insert accountType data
    await insertData<accountTypeCreate, accountType>(dataAccountType, async (data) => await prisma.accountType.create({ data }), 'accountType')

    // Insert categoryType data
    await insertData<categoryTypeCreate, categoryType>(dataCategoryType, async (data) => await prisma.categoryType.create({ data }), 'categoryType')

    // Insert category data
    await insertData<categoryCreate, category>(dataCategory, async (data) => await prisma.category.create({ data }), 'category')

    // Insert translation data
    await insertData<sexTranslationCreate, sexTranslation>(dataSexTranslation, async (data) => await prisma.sexTranslation.create({ data }), 'sexTranslation')
    await insertData<accountTTranslationCreate, accountTypeTranslation>(dataAccountTTranslation, async (data) => await prisma.accountTypeTranslation.create({ data }), 'accountTypeTranslation')
    await insertData<categoryTypeTranslationCreate, categoryTypeTranslation>(datacategoryTypeTranslation, async (data) => await prisma.categoryTypeTranslation.create({ data }), 'categoryTypeTranslation')
    await insertData<categoryTranslationCreate, categoryTranslation>(dataCategoryTranslation, async (data) => await prisma.categoryTranslation.create({ data }), 'categoryTranslation')

    // Log a final success message when all data has been inserted
    console.log(chalk.hex('#b9bbbf')('All seed data') + chalk.hex('#0bd18a').bold(' successfully ') + chalk.hex('#b9bbbf')('inserted'))
  } catch (error) {
    // Log an error message if an unexpected error occurs
    console.error(chalk.red('An unexpected error occurred:'), error)
  } finally {
    // Disconnect from the Prisma client
    await prisma.$disconnect()
  }
}

// Execute the main function
void main()
