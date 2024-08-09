/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai'
import { accountTypeTranslation, categoryTranslation, categoryTypeTranslation, PrismaClient, sexTranslation } from '@prisma/client'
import chalk from 'chalk'
import { dataSexTranslation } from '../../prisma/seeds/data/translation/sexTranslation'
import { dataAccountTTranslation } from '../../prisma/seeds/data/translation/accountTypeTranslation'
import { datacategoryTypeTranslation } from '../../prisma/seeds/data/translation/categoryTypeTranslation'
import { dataCategoryTranslation } from '../../prisma/seeds/data/translation/categoryTranslation'

const prisma = new PrismaClient()

describe(chalk.hex('#c6a363').bold('translation seed tests 🌱'), (): void => {
  describe('sexTranslation seed test', (): void => {
    it('should verify that sexTranslation seed data exist in database', async (): Promise<void> => {
      for (const sexTranslation of dataSexTranslation) {
        const exists: sexTranslation | null = await prisma.sexTranslation.findFirst({ where: { name: sexTranslation.name } })
        expect(exists, `Expected SexTranslation with name '${sexTranslation.name}' to exist in the database`).to.be.not.null
      }
    })
  })
  describe('accountTypeTranslation seed test', (): void => {
    it('should verify that accountTypeTranslation seed data exist in database', async (): Promise<void> => {
      for (const accountTypeTranslation of dataAccountTTranslation) {
        const exists: accountTypeTranslation | null = await prisma.accountTypeTranslation.findFirst({ where: { name: accountTypeTranslation.name } })
        expect(exists, `Expected accountTypeTranslation with name '${accountTypeTranslation.name}' to exist in the database`).to.be.not.null
      }
    })
  })

  describe('categoryTypeTranslation seed test', (): void => {
    it('should verify that categoryTypeTranslation seeds data exist in database', async (): Promise<void> => {
      for (const categoryTypeTranslation of datacategoryTypeTranslation) {
        const exists: categoryTypeTranslation | null = await prisma.categoryTypeTranslation.findFirst({ where: { name: categoryTypeTranslation.name } })
        expect(exists, `Expected categoryTypeTranslation with name '${categoryTypeTranslation.name}' to exist in the database`).to.be.not.null
      }
    })
  })

  describe('categoryTranslation seed test', (): void => {
    it('should verify that categoryTranslation seeds data exist in database', async (): Promise<void> => {
      for (const categoryTranslation of dataCategoryTranslation) {
        const exists: categoryTranslation | null = await prisma.categoryTranslation.findFirst({ where: { name: categoryTranslation.name } })
        expect(exists, `Expected categoryTranslation with name '${categoryTranslation.name}' to exist in the database`).to.be.not.null
      }
    })
  })
})
