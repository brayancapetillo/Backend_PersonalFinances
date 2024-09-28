/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import chalk from 'chalk'
import sinon from 'sinon'

// -DTO imports
import { createAccountDTO } from '@application/dtos/account/createAccount.dto'

// -Use Case and domain entity imports
import { CreateAccountUseCase } from '@application/use-cases/account/createAccountUseCase'
import { Account } from '@domain/entities/account.entity'
import { UserPF } from '@domain/entities/userPF.entity'

// -Repositories imports
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

// -Mocks imports
import { createAccountMock } from 'test/mocks/account/createAccountMock'
import { accountMock } from 'test/mocks/account/accountMock'
import { userPFMock } from 'test/mocks/userPF/userPFMock'

describe(chalk.hex('#c6a363').bold('Accounts use-cases tests 💼'), () => {
  /**
    * Tests for the 'createAccount' use case.
    *
    * @group CreateAccountUseCase
    */
  describe('createAccount use case', (): void => {
    let createAccountUseCase: CreateAccountUseCase
    let accountPrismaRepositoryStub: sinon.SinonStubbedInstance<AccountPrismaRepository>
    let userPFPrismaRepositoryStub: sinon.SinonStubbedInstance<UserPFPrismaRepository>

    /**
     * Mock DTO for create account.
     *
     * @type {createAccountDTO}
     */
    const createAccountDTO: createAccountDTO = createAccountMock

    /**
     * Mock instance of the 'Account' entity.
     *
     * @type {Account}
     */
    const accountInstance: Account = accountMock

    /**
     * Mock instance of the `UserPF` entity.
     *
     * @type {UserPF}
     */
    const userInstance: UserPF = userPFMock

    /**
     * Setup before each test case.
     */
    beforeEach((): void => {
      // Create a stub for the accountPrismaRepositoryStub
      accountPrismaRepositoryStub = sinon.createStubInstance(AccountPrismaRepository)

      // Create a stub for the UserPFPrismaRepository
      userPFPrismaRepositoryStub = sinon.createStubInstance(UserPFPrismaRepository)

      // Instantiate the createAccountUseCase use case with the stubbed repository, stubbed accountPrismaRepositoryStub
      createAccountUseCase = new CreateAccountUseCase(accountPrismaRepositoryStub, userPFPrismaRepositoryStub)
    })

    /**
     * Restore original funcionality after each test case.
     */
    afterEach((): void => {
      sinon.restore()
    })

    /**
     * Test case to verify the successful creation of an account.
     *
     * This test simulates the interaction with the UserPF repository and the Account
     * repository by mocking their methods. Specifically, it verifies that:
     * - A user is successfully found by id.
     * - No existing account is found by the provided account number.
     * - A new account is created successfully.
     *
     * The test checks that the returned result matches the expected account instance.
     *
     * @returns {Promise<void>}
     */
    it('should create an account successfully', async (): Promise<void> => {
      userPFPrismaRepositoryStub.findById.resolves(userInstance)

      accountPrismaRepositoryStub.findByAccountNumber.resolves(null)
      accountPrismaRepositoryStub.create.resolves(accountInstance)

      const result: Account = await createAccountUseCase.execute(createAccountDTO)

      expect(result).to.be.instanceOf(Account)
      expect(result).to.deep.equal(accountInstance)
      expect(userPFPrismaRepositoryStub.findById.calledOnce).to.be.true
      expect(accountPrismaRepositoryStub.findByAccountNumber.calledOnce).to.be.true
      expect(accountPrismaRepositoryStub.create.calledOnce).to.be.true
    })

    /**
     * Test case to ensure an error is thrown when an user is invalid.
     *
     * This test simulates the scenario where `findById` method of the user repository
     * returns `null` when searching for an user by its id. It verifies that an `HttpError`
     * with the status code 'UNPROCESSABLE_ENTITY' is thrown, along with the message `'invalid user Id'`
     *
     * @throws {HttpError} - if the user is invalid
     * @returns {Promise<void>}
     */
    it('should throw an error if the user is not found', async (): Promise<void> => {
      userPFPrismaRepositoryStub.findById.resolves(null)
      try {
        await createAccountUseCase.execute(createAccountDTO)
        expect(userPFPrismaRepositoryStub.findById.calledOnce).to.be.true
        expect.fail('Expected error not thrown')
      } catch (error: any) {
        expect(error).to.be.instanceOf(HttpError)
        expect((error as HttpError).status).to.be.equal(clientErrorStatusCodes.UNPROCESSABLE_ENTITY)
        expect((error as HttpError).message).to.be.equal('invalid user Id')
      }
    })

    /**
     * Test case to ensure an error is thrown when an account is not found.
     *
     * This test simulates the scenario where the `findById` method returns `null`
     * when searching for an account by its ID. It verifies that an `HttpError` is
     * thrown with the status `NOT_FOUND` and the message `'account not found'`.
     *
     * @throws {HttpError} If the account number is already registered.
     * @returns {Promise<void>}
     */
    it('should throw an error if the number account is already registered', async (): Promise<void> => {
      accountPrismaRepositoryStub.findByAccountNumber.resolves(accountInstance)

      try {
        await createAccountUseCase.execute(createAccountDTO)
        expect(accountPrismaRepositoryStub.findByAccountNumber.calledOnce).to.be.true
        expect.fail('Expected error not thrown')
      } catch (error: any) {
        expect(error).to.be.instanceOf(HttpError)
        expect((error as HttpError).status).to.be.equal(clientErrorStatusCodes.CONFLICT)
        expect((error as HttpError).message).to.be.equal('account number is already registered')
      }
    })
  })
})
