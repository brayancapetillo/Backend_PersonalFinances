/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import chalk from 'chalk'

// -Prisma imports
import { bank, lenguage, PrismaClient } from '@prisma/client'

// -Seed data imports
import { dataCategoryType } from 'prisma/seeds/data/categoryType'
import { dataAccountType } from 'prisma/seeds/data/accountType'
import { dataLenguage } from 'prisma/seeds/data/lenguage'
import { dataCategory } from 'prisma/seeds/data/category'
import { dataBank } from 'prisma/seeds/data/bank'

// -Interface imports
import { categoryTypeCreate } from '@interfaces/categoryType.interface'
import { lenguageCreate } from '@interfaces/lenguage.interface'
import { categoryCreate } from '@interfaces/category.interface'
import { bankCreate } from '@interfaces/bank.interface'

// -PrismaClient instance for data base interactions
const prisma = new PrismaClient()

/**
 * Test suite for verifying the existence of data seeds in the database.
 *
 * This suite includes test for varius seed data types to ensure that they
 * are properly seeded in database.
 */
describe(chalk.hex('#c6a363').bold('seed tests 🌱'), () => {
  /**
   * Test suite for verifying 'lenguage' seed data.
   */

  describe('lenguage seed test', () => {
    /**
     * Verifies that each 'lenguage' seed data exist in database.
     *
     * Iterates over the 'dataLenguage' array and checks if each 'lang'
     * With the given 'name' exists in database.
    */
    it('should verify that lenguage seed data exists in the database', async () => {
      await Promise.all(dataLenguage.map(async (lang: lenguageCreate): Promise<void> => {
        const exists: lenguage | null = await prisma.lenguage.findFirst({ where: { name: lang.name } })
        expect(exists, `Expected language with name '${lang.name}' to exist in the database`).to.not.be.null
      }))
    })
  })

  /**
   * Test suite for verifying 'bank' seed data.
   */
  describe('bank seed test', () => {
    /**
     * Verifies that each 'bank' seed data exist in database.
     *
     * Iterates over the 'dataBank' array and checks if each 'bank'
     * With the given 'name' exists in database.
     */
    it('should verify that bank seed data exists in the database', async () => {
      await Promise.all(dataBank.map(async (bank: bankCreate): Promise<void> => {
        const exists: bank | null = await prisma.bank.findFirst({ where: { name: bank.name } })
        expect(exists, `Expected bank with name '${bank.name}' to exist in the database`).to.not.be.null
      }))
    })
  })

  /**
   * Test suite for verifying 'accountType' seed exist in database.
   */
  describe('accountType seed test', () => {
    /**
     * Verifies that each 'accountType' seed data exist in database.
     *
     * Iterates over the 'dataaccountType' array and checks if each 'accountType'
     * With the given 'name' exists in database.
     */
    it('should verify that accountType seed data exists in the database', async () => {
      await Promise.all(dataAccountType.map(async (accountType): Promise<void> => {
        const exists: bank | null = await prisma.accountType.findFirst({ where: { name: accountType.name } })
        expect(exists, `Expected accountType with name '${accountType.name}' to exist in the database`).to.not.be.null
      }))
    })
  })

  /**
   * Test suite for verifying 'categoryType' seed exist in database.
   */
  describe('categoryType seed test', () => {
    /**
     * Verifies that each 'categoryType' seed data exists in the database.
     *
     * Iterates over the 'dataCategoryType' array and checks if each 'categoryType'
     * With the given 'name' exists in database.
     */
    it('should verify that categoryType seed data exists in the database', async () => {
      await Promise.all(dataCategoryType.map(async (categoryType: categoryTypeCreate) => {
        const exists: bank | null = await prisma.categoryType.findFirst({ where: { name: categoryType.name } })
        expect(exists, `Expected categoryType with name '${categoryType.name}' to exist in the database`).to.not.be.null
      }))
    })
  })

  /**
   * Test suite for verifying 'category' seed exist in database.
   *
   * Iterates over the 'dataCategory' array and checks if each 'category'
   * with the given 'name' exists in database.
   */
  describe('category seed test', () => {
    it('should verify that category seed data exists in the database', async () => {
      await Promise.all(dataCategory.map(async (category: categoryCreate): Promise<void> => {
        const exists: bank | null = await prisma.category.findFirst({ where: { name: category.name } })
        expect(exists, `Expected category with name '${category.name}' to exist in the database`).to.not.be.null
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
