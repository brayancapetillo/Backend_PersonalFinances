/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai'
import { accountTypeTranslation, PrismaClient, sexTranslation } from '@prisma/client'
import chalk from 'chalk'
import { dataSexTranslation } from '../../prisma/seeds/data/translation/sexTranslation'
import { dataAccountTTranslation } from '../../prisma/seeds/data/translation/accountTypeTranslation'

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
})
