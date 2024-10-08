/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import chalk from 'chalk'

// -Prisma imports
import { accountTypeTranslation, categoryTranslation, categoryTypeTranslation, sexTranslation } from '@prisma/client'

// - Prisma client
import prisma from '@infrastructure/database/prisma/prismaClient'

// -Seed data imports
import { datacategoryTypeTranslation } from 'prisma/seeds/data/translation/categoryTypeTranslation'
import { dataAccountTTranslation } from 'prisma/seeds/data/translation/accountTypeTranslation'
import { dataCategoryTranslation } from 'prisma/seeds/data/translation/categoryTranslation'
import { dataSexTranslation } from 'prisma/seeds/data/translation/sexTranslation'

/**
 * Test suite for verifying the existence of seed data translations in the database.
 *
 * This suite includes test for varius seed data translation to ensuere that they
 * are properly seeded in database.
 *
 * @group seedsTranslation
 */
describe(chalk.hex('#c6a363').bold('translation seed tests 🌱'), (): void => {
  /**
   * Test suite for verifying 'sexTranslation' seed data.
   */
  describe('sexTranslation seed test', (): void => {
    /**
     * Verifies that each 'sexTranslation' seed data exists in database.
     *
     * Iterate over the 'dataSexTranslation' array and checks if each 'sexTranslation'
     * with the given 'idSex', 'idLenguage', and 'name' exists in database.
     *
     * @returns {Promise<void>}
     */
    it('should verify that sexTranslation seed data exist in database', async (): Promise<void> => {
      await Promise.all(dataSexTranslation.map(async (sexTranslation: Pick<sexTranslation, 'idSex' | 'idLenguage' | 'name'>): Promise<void> => {
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
   * Test suite for verifying 'accountTypeTranslation' seed data.
   */
  describe('accountTypeTranslation seed test', (): void => {
    /**
     * Verifies that each 'accountTypeTranslation' seed data exists in database.
     *
     * Iterate over the 'dataAccountTTranslation' array and checks if each 'accountTTranslation'
     * with the given 'idAccountType', 'idLenguage', and name exist in database.
     *
     * @returns {Promise<void>}
     */
    it('should verify that accountTypeTranslation seed data exist in database', async (): Promise<void> => {
      await Promise.all(dataAccountTTranslation.map(async (accountTTranslation: Pick<accountTypeTranslation, 'idAccountType' | 'idLenguage' | 'name'>): Promise<void> => {
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
   * Test suite for verifying 'categoryTypeTranslation' seed data.
   */
  describe('categoryTypeTranslation seed test', (): void => {
    /**
     * Verifies that each 'categoryTypeTranslation' seed data exists in database.
     *
     * Iterate over the 'datacategoryTypeTranslation' array and check if each 'categoryTypeTranslation'
     * with the given 'idCategoryType', 'idLenguage', and 'name' exist in database.
     *
     * @returns {Promise<void>}
    */
    it('should verify that categoryTypeTranslation seeds data exist in database', async (): Promise<void> => {
      await Promise.all(datacategoryTypeTranslation.map(async (categoryTypeTranslation: Pick<categoryTypeTranslation, 'idCategoryType' | 'idLenguage' | 'name'>): Promise<void> => {
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
   * Test suite for verifying 'categoryTranslation' seed data.
   */
  describe('categoryTranslation seed test', (): void => {
    /**
     * Verifies that each 'categoryTranslation' data exists in database.
     *
     * Iterate over the 'dataCategoryTranslation' array and checks if 'categoryTranslation'
     * with the given 'idCategory', 'idLenguage', and 'name' exist in database.
     *
     * @returns {Promise<void>}
     */
    it('should verify that categoryTranslation seeds data exist in database', async (): Promise<void> => {
      await Promise.all(dataCategoryTranslation.map(async (categoryTranslation: Pick<categoryTranslation, 'idCategory' | 'idLenguage' | 'name'>): Promise<void> => {
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
})
