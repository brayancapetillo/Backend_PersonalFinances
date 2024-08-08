/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai'
import { bank, lenguage, PrismaClient } from '@prisma/client'
import { dataLenguage } from '../../prisma/seeds/data/lenguage'
import { dataBank } from '../../prisma/seeds/data/bank'

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
  describe('bank seed test', () => {
    it('should verify that bank seed data exists in the database', async () => {
      for (const bank of dataBank) {
        const exists: bank | null = await prisma.bank.findFirst({ where: { name: bank.name } })
        expect(exists, `Expected language with name '${bank.name}' to exist in the database`).to.not.be.null
      }
    })
  })
})
