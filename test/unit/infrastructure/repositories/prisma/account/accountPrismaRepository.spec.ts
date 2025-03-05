/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import chalk from 'chalk'
import sinon from 'sinon'

// -DTO imports
import { updateAccountDTO } from '@application/dtos/account/updateAccount.dto'

// -Interfaces and domain entity imports
import { IAccountRepository } from '@domain/interfaces/accountRepository'
import { Account } from '@domain/entities/account.entity'

// -Repository's import
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'

// -Mock's import
import { accountUpdatePrismaMock, updateAccountDTOMock } from 'test/mocks/account/updateAccountMock'
import { accountPrismaMock } from 'test/mocks/account/createAccountMock'
import { createPrismaMock } from 'test/mocks/prisma/prismaMock'
import { accountMock } from 'test/mocks/account/accountMock'

// -Prisma's import
import { account as prismaAccount, PrismaClient } from '@prisma/client'

/**
 * Tests for the 'Account' prisma repository.
 *
 * @group Account
 */
describe(chalk.hex('#c6a363').bold('Account Prisma Repository tests 📚'), () => {
  /**
   * Tests for the 'AccountPrismaRepository' implementation.
   *
   * @group AccountPrismaRepository
   */

  describe('AccountPrismaRepository', (): void => {
    let accountPrismaRepository: IAccountRepository
    let prismaMock: ReturnType<typeof createPrismaMock>

    /**
     * Mock instance of the 'Account' entity.
     *
     * @type {Account}
     */
    const accountInstance: Account = accountMock

    /**
     * Mock of 'account' of prisma.
     *
     * @type {prismaAccount}
     */
    const mockPrismaAccount: prismaAccount = accountPrismaMock

    /**
     * Mock update of 'account' of prisma.
     *
     * @type {prismaAccount}
     */
    const mockPrismaUpdateAccount: prismaAccount = accountUpdatePrismaMock

    /**
     * Mock DTO for update account.
     *
     * @type {updateAccountDTO}
     */
    const updateAccountDTO: updateAccountDTO = updateAccountDTOMock

    /**
     * setup before each test case.
     */
    beforeEach((): void => {
      // Create mock of prisma and methods
      prismaMock = createPrismaMock()

      // Create mock accountPrismaRepository
      accountPrismaRepository = new AccountPrismaRepository(prismaMock as unknown as PrismaClient)
    })

    /**
     * Restore the original state of mocks after each test.
     */
    afterEach((): void => {
      sinon.restore()
    })

    /**
     * Tests the retrieval of an account by its ID.
     *
     * Verifies that an account instance is returned, that the ID matches the expected
     * value, and that the Prisma client is called correctly.
     *
     * @return {Promise<void>}
     */
    it('should find account by id and return account instance', async (): Promise<void> => {
      prismaMock.account.findUnique.resolves(mockPrismaAccount)

      const result: Account | null = await accountPrismaRepository.findById(mockPrismaAccount.id)

      expect(result).to.be.instanceOf(Account)
      expect(result?.id).to.be.equal(mockPrismaAccount.id)
      expect(prismaMock.account.findUnique.calledOnce).to.be.true
      expect(prismaMock.account.findUnique.calledWith({ where: { id: mockPrismaAccount.id }, include: { bank: true, accountType: true } })).to.be.true
    })

    /**
     * Tests the retrieval of an account by its account number.
     *
     * Verifies that an account instance is returned, that the account number matches
     * the expected value, and that the Prisma client is called correctly.
     *
     * @return {Promise<void>}
     */
    it('should find account by account number and return account instance', async (): Promise<void> => {
      prismaMock.account.findUnique.resolves(mockPrismaAccount)

      const result: Account | null = await accountPrismaRepository.findByAccountNumber(mockPrismaAccount.accountNumber)

      expect(result).to.be.instanceOf(Account)
      expect(result?.accountNumber).to.be.equal(mockPrismaAccount.accountNumber)
      expect(prismaMock.account.findUnique.calledOnce).to.be.true
      expect(prismaMock.account.findUnique.calledWith({ where: { accountNumber: mockPrismaAccount.accountNumber }, include: { bank: true, accountType: true } })).to.be.true
    })

    /**
     * Test to verify that a new account can be created.
     *
     * If the created account is successful, it should return an instance of 'Account'.
     *
     * @returns {Promise<void>}
     */
    it('should create a account and return instance of the Account', async (): Promise<void> => {
      prismaMock.account.create.resolves(mockPrismaAccount)

      const result: Account = await accountPrismaRepository.create(accountInstance)

      expect(result).to.be.instanceOf(Account)
      expect(prismaMock.account.create.calledOnce).to.be.true
    })

    /**
     * Test to verify that a account can be updated.
     *
     * if the successful account has been updated, it should return an instance of 'Account'.
     *
     * @returns {Promise<void>}
     */
    it('should update a account and return instance of the account', async (): Promise<void> => {
      prismaMock.account.update.resolves(mockPrismaUpdateAccount)

      const result: Account = await accountPrismaRepository.update(mockPrismaAccount.id, updateAccountDTO)

      expect(result).to.be.instanceOf(Account)
      expect(prismaMock.account.update.calledOnce).to.be.true
    })

    /**
     * Test to verify that a account can be deleted.
     *
     * @returns {Promise<void>}
     */
    it('should delete a account', async (): Promise<void> => {
      prismaMock.account.delete.resolves()

      await accountPrismaRepository.delete(mockPrismaAccount.id)

      expect(prismaMock.account.delete.calledOnce).to.be.true
      expect(prismaMock.account.delete.calledOnceWith({ where: { id: mockPrismaAccount.id } }))
    })
  })
})
