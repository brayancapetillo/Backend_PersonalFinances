/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import Sinon from 'sinon'
import chalk from 'chalk'

// -Interfaces and domain entity imports
import { UserPFRepository } from '@domain/interfaces/UserPFRepository'
import { UserPF } from '@domain/entities/userPF.entity'

// -Prisma mock imports
import { createPrismaMock } from 'test/mocks/prisma/prismaMock'
import { userPFMock } from 'test/mocks/userPF/userPFMock'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'
import { PrismaClient } from '@prisma/client'

/**
 * Tests for the 'UserPF' prisma repository.
 *
 * @group UserPF
 */
describe(chalk.hex('#c6a363').bold('UserPF Prisma Repository tests 📚'), () => {
  /**
   * Tests for the 'UserPFPrismaRepository' implementation.
   *
   * @group UserPFPrismaRepository
   */
  describe('UserPFPrismaRepository', (): void => {
    let userPFPrismaRepository: UserPFRepository
    let prismaMock: ReturnType<typeof createPrismaMock>

    /**
     * Mock instance of the 'USerPF' entity.
     */
    const mockPrismaUserPF: UserPF = userPFMock

    /**
     * setup before each test case.
     */
    beforeEach(() => {
      // Create mock of prisma and methods
      prismaMock = createPrismaMock()

      // Create mock userPFPrismaRepository
      userPFPrismaRepository = new UserPFPrismaRepository(prismaMock as unknown as PrismaClient)
    })

    /**
     * Restore the original state of mocks after each test.
     */
    afterEach((): void => {
      Sinon.restore()
    })

    /**
     * Test to verify that a user can be found by its ID.
     * If found, it should return a instance of 'UserPF'.
     *
     * @returns {Promise<void>}
     */
    it('should find user by id and return a UserPF instance', async (): Promise<void> => {
      prismaMock.userPF.findUnique.resolves(mockPrismaUserPF)

      const result: UserPF | null = await userPFPrismaRepository.findById(mockPrismaUserPF.id)

      expect(result).to.be.an.instanceOf(UserPF)
      expect(result?.id).to.equal(mockPrismaUserPF.id)
      expect(prismaMock.userPF.findUnique.calledOnce).to.be.true
      expect(prismaMock.userPF.findUnique.calledWith({ where: { id: mockPrismaUserPF.id } })).to.be.true
    })

    /**
     * Test to verify the behavior when a user is not found by its ID.
     * It should return 'null'.
     *
     * @returns {Promise<void>}
     */
    it('should return null when no user is found by id', async (): Promise<void> => {
      prismaMock.userPF.findUnique.resolves(null)

      const result: UserPF | null = await userPFPrismaRepository.findById(mockPrismaUserPF.id)

      expect(result).to.be.null
      expect(prismaMock.userPF.findUnique.calledOnce).to.be.true
      expect(prismaMock.userPF.findUnique.calledWith({ where: { id: mockPrismaUserPF.id } })).to.be.true
    })

    /**
     * Test to verify that a user can be found by their email.
     * If found, it should return a instance of 'UserPF'.
     *
     * @returns {Promise<void>}
     */
    it('should find user by email and return a UserPF instance', async (): Promise<void> => {
      prismaMock.userPF.findUnique.resolves(mockPrismaUserPF)

      const result: UserPF | null = await userPFPrismaRepository.findByEmail(mockPrismaUserPF.email)

      expect(result).to.be.an.instanceOf(UserPF)
      expect(result?.email).to.equal(mockPrismaUserPF.email)
      expect(prismaMock.userPF.findUnique.calledOnce).to.be.true
      expect(prismaMock.userPF.findUnique.calledWith({ where: { email: mockPrismaUserPF.email } })).to.be.true
    })

    /**
     * Test to verify the behavior when a user is not found by their email.
     * Ir should return 'null'.
     *
     * @returns {Promise<void>}
     */
    it('should return null when no user is found by email', async (): Promise<void> => {
      prismaMock.userPF.findUnique.resolves(null)

      const result: UserPF | null = await userPFPrismaRepository.findByEmail(mockPrismaUserPF.email)

      expect(result).to.be.null
      expect(prismaMock.userPF.findUnique.calledOnce).to.be.true
      expect(prismaMock.userPF.findUnique.calledWith({ where: { email: mockPrismaUserPF.email } })).to.be.true
    })

    /**
     * Test to verify that a user can be found by their number phone.
     * If found, it should return an instance of 'UserPF'.
     *
     * @returns {Promise<void>}
     */
    it('should find user by number phone and return a UserPF a instance', async (): Promise<void> => {
      // Validate that the number phone is not null before performing the search
      if (mockPrismaUserPF.phone !== null) {
        prismaMock.userPF.findFirst.resolves(mockPrismaUserPF)

        const result: UserPF | null = await userPFPrismaRepository.findByPhone(mockPrismaUserPF.phone)

        expect(result).to.be.an.instanceOf(UserPF)
        expect(result?.phone).to.equal(mockPrismaUserPF.phone)
        expect(prismaMock.userPF.findFirst.calledOnce).to.be.true
        expect(prismaMock.userPF.findFirst.calledWith({ where: { phone: mockPrismaUserPF.phone } })).to.be.true
      }
    })

    /**
     * Test to verify the behavior when a user is not found by their number phone.
     * It should return 'null'.
     *
     * @returns {Promise<void>}
     */
    it('should return null when no user is found by number phone', async (): Promise<void> => {
      // Validate that the number phone is not null before performing the search
      if (mockPrismaUserPF.phone !== null) {
        prismaMock.userPF.findFirst.resolves(null)

        const result: UserPF | null = await userPFPrismaRepository.findByPhone(mockPrismaUserPF.phone)

        expect(result).to.be.null
        expect(prismaMock.userPF.findFirst.calledOnce).to.be.true
        expect(prismaMock.userPF.findFirst.calledWith({ where: { phone: mockPrismaUserPF.phone } })).to.be.true
      }
    })

    /**
     * Test to verify that a new user can be registered.
     * If the registration is successful, it should return an instance of 'UserPF'
     *
     * @returns {Promise<void>}
     */
    it('should register a user and return a UserPF a intance', async (): Promise<void> => {
      // Create a user intance to be registered
      const userInstance = new UserPF(
        1,
        mockPrismaUserPF.email,
        mockPrismaUserPF.name,
        mockPrismaUserPF.lastName,
        mockPrismaUserPF.birthday,
        mockPrismaUserPF.phone,
        mockPrismaUserPF.idSex,
        mockPrismaUserPF.idLenguage,
        mockPrismaUserPF.password,
        false,
        new Date(),
        new Date()
      )

      prismaMock.userPF.create.resolves(mockPrismaUserPF)

      const result: UserPF = await userPFPrismaRepository.create(userInstance)

      expect(result).to.be.instanceOf(UserPF)
      expect(result).to.deep.equal(mockPrismaUserPF)
      expect(prismaMock.userPF.create.calledOnce).to.be.true
    })
  })
})
