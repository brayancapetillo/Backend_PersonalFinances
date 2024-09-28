/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import sinon from 'sinon'

// -Use Case and domain entity imports
import { GetAccountUseCase } from '@application/use-cases/account/getAccountUseCase'
import { Account } from '@domain/entities/account.entity'

// -Repositories imports
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

// -Mocks imports
import { accountMock } from 'test/mocks/account/accountMock'

describe('getAccount use case', (): void => {
  let getAccountUseCase: GetAccountUseCase
  let accountPrismaRepositoryStub: sinon.SinonStubbedInstance<AccountPrismaRepository>

  /**
   * Mock instance of the 'Account' entity.
   *
   * @type {Account}
   */
  const accountInstance: Account = accountMock

  /**
   * Setup before each test case.
   */
  beforeEach((): void => {
    // Create a stub for the accountPrismaRepositoryStub
    accountPrismaRepositoryStub = sinon.createStubInstance(AccountPrismaRepository)

    // Instantiate the createAccountUseCase use case with the stubbed repository, stubbed accountPrismaRepositoryStub
    getAccountUseCase = new GetAccountUseCase(accountPrismaRepositoryStub)
  })

  /**
   * Restore original funcionality after each test case.
   */
  afterEach((): void => {
    sinon.restore()
  })

  /**
   * Test case to verify if an account exists and successfully return the account data.
   *
   * This test simulates the interaction with the Account repository by mocking its
   * methods. Specifically, it verifies that:
   * - An account is successfully found by its id.
   *
   * The test checks that the returned account data matches the expected account instance.
   *
   * @returns {Promise<void>}
   */
  it('should successfully return account data by id', async (): Promise<void> => {
    accountPrismaRepositoryStub.findById.resolves(accountInstance)

    const result: Account = await getAccountUseCase.execute(accountInstance.id)

    expect(result).to.be.instanceOf(Account)
    expect(result).to.deep.equal(accountInstance)
    expect(accountPrismaRepositoryStub.findById.calledOnce).to.be.true
  })

  /**
   * Test case to ensure an error is thrown when an account is not found.
   *
   * This test simulates the scenario where the `findById` method of the account repository
   * returns `null` when searching for an account by its id. It verifies that an `HttpError`
   * with the status code `NOT_FOUND` is thrown, along with the message `'account not found'`.
   *
   * @throws {HttpError} - If the account is not found
   * @returns {Promise<void>}
   */
  it('should throw an error if the account is not found', async (): Promise<void> => {
    accountPrismaRepositoryStub.findById.resolves(null)

    try {
      await getAccountUseCase.execute(accountInstance.id)
      expect(accountPrismaRepositoryStub.findById.calledOnce).to.be.true
      expect.fail('Expected error not thrown')
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError)
      expect((error as HttpError).status).to.be.equal(clientErrorStatusCodes.NOT_FOUND)
      expect((error as HttpError).message).to.be.equal('account not found')
    }
  })
})
