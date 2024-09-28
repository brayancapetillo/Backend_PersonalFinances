/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import sinon from 'sinon'

// -DTO imports
import { updateAccountDTO } from '@application/dtos/account/updateAccount.dto'

// -Use Case and domain entity imports
import { UpdateAccountUseCase } from '@application/use-cases/account/updateAccountUseCase'
import { Account } from '@domain/entities/account.entity'

// -Repositories imports
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

// -Mocks imports
import { updateAccountDTOMock, updatedAccountMock } from 'test/mocks/account/updateAccountMock'
import { accountMock, accountTwoMock } from 'test/mocks/account/accountMock'

describe('updateAccount use case', (): void => {
  let updateAccountUseCase: UpdateAccountUseCase
  let accountPrismaRepositoryStub: sinon.SinonStubbedInstance<AccountPrismaRepository>

  /**
   * Mock instance of the 'Account' entity.
   *
   * @type {Account}
   */
  const accountInstance: Account = accountMock

  /**
   * Mock instance of the other 'Account' entity.
   *
   * @type {Account}
   */
  const otherAccountInstance: Account = accountTwoMock

  /**
   * Mock instance of the update 'Account' entity.
   *
   * @type {Account}
   */
  const updateAccountInstance: Account = updatedAccountMock

  /**
   * Mock DTO for update account.
   *
   * @type {updateAccountDTO}
   */
  let updateAccountDTO: updateAccountDTO = updateAccountDTOMock

  /**
   * Setup before each test case.
   */
  beforeEach((): void => {
    // Create a stub for the accountPrismaRepositoryStub
    accountPrismaRepositoryStub = sinon.createStubInstance(AccountPrismaRepository)

    // Instantiate the createAccountUseCase use case with the stubbed repository, stubbed accountPrismaRepositoryStub
    updateAccountUseCase = new UpdateAccountUseCase(accountPrismaRepositoryStub)

    updateAccountDTO = { ...updateAccountDTOMock }
  })

  /**
   * Restore original funcionality after each test case.
   */
  afterEach((): void => {
    sinon.restore()
  })

  /**
   * Test case for verifying a successful account update.
   *
   * This test simulates the account repository interactions:
   * - Retrieves the account by its ID.
   * - Ensures no other account exists with the same account number.
   * - Simulates the account update process.
   *
   * The test then checks that the updated account matches the expected account instance
   * and verifies that the repository methods are called appropriately.
   *
   * @returns {Promise<void>}
   */
  it('should update an account successfully', async (): Promise<void> => {
    accountPrismaRepositoryStub.findById.resolves(accountInstance)
    accountPrismaRepositoryStub.findByAccountNumber.resolves(null)
    accountPrismaRepositoryStub.update.resolves(updateAccountInstance)

    const result: Account = await updateAccountUseCase.execute(accountInstance.id, updateAccountDTO)

    expect(result).to.be.instanceOf(Account)
    expect(result).to.deep.equal(updateAccountInstance)
    expect(accountPrismaRepositoryStub.findById.calledOnceWith(accountInstance.id)).to.be.true
    expect(accountPrismaRepositoryStub.findByAccountNumber.calledOnceWith(updateAccountDTO.accountNumber)).to.be.true
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
      await updateAccountUseCase.execute(accountInstance.id, updateAccountDTO)
      expect(accountPrismaRepositoryStub.findById.calledOnce).to.be.true
      expect.fail('Expected error not thrown')
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError)
      expect((error as HttpError).status).to.be.equal(clientErrorStatusCodes.NOT_FOUND)
      expect((error as HttpError).message).to.be.equal('account not found')
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
    updateAccountDTO.accountNumber = otherAccountInstance.accountNumber
    accountPrismaRepositoryStub.findByAccountNumber.resolves(otherAccountInstance)

    try {
      await updateAccountUseCase.execute(accountInstance.id, updateAccountDTO)
      expect(accountPrismaRepositoryStub.findByAccountNumber.calledOnceWith(updateAccountDTO.accountNumber)).to.be.true
      expect.fail('Expected error not thrown')
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError)
      expect((error as HttpError).status).to.be.equal(clientErrorStatusCodes.CONFLICT)
      expect((error as HttpError).message).to.be.equal('account number is already registered')
    }
  })
})
