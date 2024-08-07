/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai'
import { lenguage, PrismaClient } from '@prisma/client'
import { dataLenguage } from '../../prisma/seeds/data/lenguage'

const prisma = new PrismaClient()

describe('seed tests', () => {
  describe('lenguage seed test', () => {
    it('should verify that lenguage seed data exists in the database', async () => {
      for (const lang of dataLenguage) {
        const exists: lenguage | null = await prisma.lenguage.findFirst({ where: { name: lang.name } })
        expect(exists, `Expected language with name '${lang.name}' to exist in the database`).to.not.be.null
      }
    })
  })
})
