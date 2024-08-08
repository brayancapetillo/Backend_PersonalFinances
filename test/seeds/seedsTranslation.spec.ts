/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai'
import { PrismaClient, sexTranslation } from '@prisma/client'
import chalk from 'chalk'
import { dataSexTranslation } from '../../prisma/seeds/data/translation/sexTranslation'

const prisma = new PrismaClient()

describe(chalk.hex('#c6a363').bold('translation seed tests 🌱'), (): void => {
  describe('sex translation seed test', (): void => {
    it('should verify that sex translation seed data exist in database', async (): Promise<void> => {
      for (const sexTranslation of dataSexTranslation) {
        const exists: sexTranslation | null = await prisma.sexTranslation.findFirst({ where: { name: sexTranslation.name } })
        expect(exists, `Expected SexTranslation with name '${sexTranslation.name}' to exist in the database`).to.be.not.null
      }
    })
  })
})
