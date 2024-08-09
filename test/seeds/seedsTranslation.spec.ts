/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import chalk from 'chalk'

// -Prisma imports
import { accountTypeTranslation, categoryTranslation, categoryTypeTranslation, PrismaClient, sexTranslation } from '@prisma/client'

// -Seed data imports
import { dataSexTranslation } from '../../prisma/seeds/data/translation/sexTranslation'
import { dataAccountTTranslation } from '../../prisma/seeds/data/translation/accountTypeTranslation'
import { datacategoryTypeTranslation } from '../../prisma/seeds/data/translation/categoryTypeTranslation'
import { dataCategoryTranslation } from '../../prisma/seeds/data/translation/categoryTranslation'
import { sexTranslationCreate } from '@interfaces/translation/sexTranslation.interface'
import { accountTTranslationCreate } from '@interfaces/translation/accountTypeTranslation.interface'
import { categoryTypeTranslationCreate } from '@interfaces/translation/categoryTypeTranslation.interface'
import { categoryTranslationCreate } from '@interfaces/translation/categoryTranslation.interface'

// -PrismaClient instance for data base interactions
const prisma = new PrismaClient()

/**
 * Test suite for verifying the existence of seeds data translation in the database.
 *
 * This suite includes test for varius seed data translation to ensuere that they
 * are properly seeded in database.
 */
describe(chalk.hex('#c6a363').bold('translation seed tests 🌱'), (): void => {
  /**
   * Test suite for verifying sexTranslation seed data.
   */
  describe('sexTranslation seed test', (): void => {
    /**
     * Verifies that each sexTranslation seed data exist in database.
     *
     * Iterate over the 'dataSexTranslation' array and checks if each sexTranslation
     * with the given name exist in database.
     */
    it('should verify that sexTranslation seed data exist in database', async (): Promise<void> => {
      await Promise.all(dataSexTranslation.map(async (sexTranslation: sexTranslationCreate) => {
        const exists: sexTranslation | null = await prisma.sexTranslation.findFirst(
          {
            where: {
              AND: [{ idSex: sexTranslation.idSex, idLenguage: sexTranslation.idLenguage, name: sexTranslation.name }]
            }
          }
        )
        expect(exists, `Expected sexTranslation with idSex ${sexTranslation.idSex}, idLenguage ${sexTranslation.idLenguage} and name '${sexTranslation.name}' to exist in the database`).to.be.not.null
      }))
    })
  })

  /**
   * Test suite for verifying accountTypeTranslation seeds data.
   */
  describe('accountTypeTranslation seed test', (): void => {
    /**
     * Verifies that each accountTypeTranslation seed data exist in database.
     *
     * Iterate over the 'dataAccountTTranslation' array and checks if each accountTypeTranslation
     * with the given name exist in database.
     */
    it('should verify that accountTypeTranslation seed data exist in database', async (): Promise<void> => {
      await Promise.all(dataAccountTTranslation.map(async (accountTTranslation: accountTTranslationCreate): Promise<void> => {
        const exists: accountTypeTranslation | null = await prisma.accountTypeTranslation.findFirst(
          {
            where: {
              AND: [{ idAccountType: accountTTranslation.idAccountType, idLenguage: accountTTranslation.idLenguage, name: accountTTranslation.name }]
            }
          }
        )
        expect(exists, `Expected accountTypeTranslation with idAccountType ${accountTTranslation.idAccountType}, idLenguage ${accountTTranslation.idLenguage} and name '${accountTTranslation.name}' to exist in the database`).to.be.not.null
      }))
    })
  })

  /**
   * Test suite for verifying categoryTypeTranslation seeds data.
   */
  describe('categoryTypeTranslation seed test', (): void => {
    /**
     * Verifies that each categoryTypeTranslation seeds data exists in database.
     *
     * Iterate over the 'datacategoryTypeTranslation' array and check if each categoryTypeTranslation
     * with the given name exist in database.
    */
    it('should verify that categoryTypeTranslation seeds data exist in database', async (): Promise<void> => {
      await Promise.all(datacategoryTypeTranslation.map(async (categoryTypeTranslation: categoryTypeTranslationCreate) => {
        const exists: categoryTypeTranslation | null = await prisma.categoryTypeTranslation.findFirst(
          {
            where: {
              AND: [{ idCategoryType: categoryTypeTranslation.idCategoryType, idLenguage: categoryTypeTranslation.idLenguage, name: categoryTypeTranslation.name }]
            }
          }
        )
        expect(exists, `Expected categoryTypeTranslation with idCategoryType ${categoryTypeTranslation.idCategoryType}, idLenguage ${categoryTypeTranslation.idLenguage} and name ${categoryTypeTranslation.name} to exist in the database`).to.be.not.null
      }))
    })
  })

  /**
   * Test suite for verifying categoryTranslation seeds data.
   */
  describe('categoryTranslation seed test', (): void => {
    /**
     * Verifies that each categoryTranslation data exist in database.
     *
     * Iterate over the 'dataCategoryTranslation' array and checks if categoryTranslation
     * with the given name exist in database.
     */
    it('should verify that categoryTranslation seeds data exist in database', async (): Promise<void> => {
      await Promise.all(dataCategoryTranslation.map(async (categoryTranslation: categoryTranslationCreate) => {
        const exists: categoryTranslation | null = await prisma.categoryTranslation.findFirst(
          {
            where: {
              AND: [{ idCategory: categoryTranslation.idCategory, idLenguage: categoryTranslation.idLenguage, name: categoryTranslation.name }]
            }
          }
        )
        expect(exists, `Expected categoryTranslation with idCategory ${categoryTranslation.idCategory}, idLenguage ${categoryTranslation.idLenguage} and name ${categoryTranslation.name} to exist in the database`).to.be.not.null
      }))
    })
  })

  /**
   * Closes the prismaClient connection after all test have completed.
   *
   * This hook is execute after all test in the suite.
   * It ensures that PrismaClient disconnects from the database,
   * releasing resources and preventing conecction leaks.
   */
  after(async () => {
    await prisma.$disconnect()
  })
})
