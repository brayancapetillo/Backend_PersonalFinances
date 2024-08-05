// -Import necessary modules
import { accountType, accountTypeTranslation, bank, category, categoryTranslation, categoryType, categoryTypeTranslation, lenguage, PrismaClient, sex, sexTranslation } from '@prisma/client'
import chalk from 'chalk'

// -Data Imports

import { dataLenguage } from './data/lenguage'

// -Translation data imports

// -Interface imports
import { lenguageCreate } from '@interfaces/lenguage.interface'
import { sexCreate } from '@interfaces/sex.interface'
import { dataSex } from './data/sex'
import { bankCreate } from '@interfaces/bank.interface'
import { dataBank } from './data/bank'
import { accountTypeCreate } from '@interfaces/accountType.interface'
import { dataAccountType } from './data/accountType'
import { categoryTypeCreate } from '@interfaces/categoryType.interface'
import { dataCategoryType } from './data/categoryType'
import { categoryCreate } from '@interfaces/category.interface'
import { dataCategory } from './data/category'
import { sexTranslationCreate } from '@interfaces/translation/sexTranslation.interface'
import { dataSexTranslation } from './data/translation/sexTranslation'
import { accountTTranslationCreate } from '@interfaces/translation/accountTypeTranslation.interface'
import { dataAccountTTranslation } from './data/translation/accountTypeTranslation'
import { categoryTranslationCreate } from '@interfaces/translation/categoryTranslation.interface'
import { datacategoryTypeTranslation } from './data/translation/categoryTypeTranslation'
import { categoryTypeTranslationCreate } from '@interfaces/translation/categoryTypeTranslation.interface'
import { dataCategoryTranslation } from './data/translation/categoryTranslation'

// -Translation interface imports

// Instantiate Prisma Client to interact with the database
const prisma = new PrismaClient()

const insertData = async <T, R>(data: T[], create: (item: T) => Promise<R>, typeName: string): Promise<void> => {
  try {
    for (const item of data) {
      await create(item)
    }

    console.log(chalk.hex('#b9bbbf')('Seed data') + chalk.hex('#dbc8a7').bold(` ${typeName} `) + chalk.hex('#b9bbbf')('inserted')
    )
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${typeName}: ${error as string}`)
    )
  }
}

const main = async (): Promise<void> => {
  try {
    await insertData<lenguageCreate, lenguage>(dataLenguage, async (data) => await prisma.lenguage.create({ data }), 'lenguage')
    await insertData<sexCreate, sex>(dataSex, async (data) => await prisma.sex.create({ data }), 'sex')
    await insertData<bankCreate, bank>(dataBank, async (data) => await prisma.bank.create({ data }), 'bank')
    await insertData<accountTypeCreate, accountType>(dataAccountType, async (data) => await prisma.accountType.create({ data }), 'accountType')
    await insertData<categoryTypeCreate, categoryType>(dataCategoryType, async (data) => await prisma.categoryType.create({ data }), 'categoryType')
    await insertData<categoryCreate, category>(dataCategory, async (data) => await prisma.category.create({ data }), 'category')

    // Translation data
    await insertData<sexTranslationCreate, sexTranslation>(dataSexTranslation, async (data) => await prisma.sexTranslation.create({ data }), 'sexTranslation')
    await insertData<accountTTranslationCreate, accountTypeTranslation>(dataAccountTTranslation, async (data) => await prisma.accountTypeTranslation.create({ data }), 'accountTypeTranslation')
    await insertData<categoryTypeTranslationCreate, categoryTypeTranslation>(datacategoryTypeTranslation, async (data) => await prisma.categoryTypeTranslation.create({ data }), 'categoryTypeTranslation')
    await insertData<categoryTranslationCreate, categoryTranslation>(dataCategoryTranslation, async (data) => await prisma.categoryTranslation.create({ data }), 'categoryTranslation')

    console.log(chalk.hex('#b9bbbf')('All seed data') + chalk.hex('#0bd18a').bold(' successfully ') + chalk.hex('#b9bbbf')('inserted'))
  } catch (error) {
    console.error(chalk.red('An unexpected error occurred:'), error)
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the main function
void main()
