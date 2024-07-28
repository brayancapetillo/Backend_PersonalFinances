import { PrismaClient } from '@prisma/client'
import chalk from 'chalk'

import { dataSex } from './data/sex'
import { sexCreate } from '@interfaces/sex.interface'

const prisma = new PrismaClient()

const insertDataSex = async (sex: sexCreate): Promise<void> => {
  try {
    await prisma.sex.create({ data: sex })
  } catch (error) {
    console.error(chalk.red(`Failed to insert ${JSON.stringify(sex)}: ${error as string}`))
  }
}

const main = async (): Promise<void> => {
  try {
    await Promise.all(dataSex.map(insertDataSex))

    console.log(chalk.green('Data successfully inserted'))
  } catch (error) {
    console.error(chalk.red('An unexpected error occurred:'), error)
  } finally {
    await prisma.$disconnect()
  }
}

void main()
