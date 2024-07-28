import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'

import { dataSex } from './data/sex'
import { sexCreate } from '@interfaces/sex.interface'
import { bankCreate } from '@interfaces/bank.interface'
import { dataBank } from './data/bank'

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

const main = async (): Promise<void> => {
  try {
    for (const sex of dataSex) { await insertDataSex(sex) }
    for (const bank of dataBank) { await insertDataBank(bank) }

    console.log(chalk.green('Data successfully inserted'))
  } catch (error) {
    console.error(chalk.red('An unexpected error occurred:'), error)
  } finally {
    await prisma.$disconnect()
  }
}

void main()
