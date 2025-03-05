/**
 * Unit tests for the AccountController class.
 *
 * This file contains a suite of tests that verify the behavior of the 'createAccount', 'getAccount',
 * 'updateAccount', and 'deleteAccount' methods in the AccountController class. The tests cover various
 * scenarios, including successful operations, HttpErrors, and generic error handling.
 *
 * ### Test Scenarios:
 *
 * *createAccount*
 * - Verifies successful account creation response.
 * - Handles HttpError appropriately.
 * - Verifies generic error handling.
 *
 * *getAccount*
 * - Ensures successful response when retrieving account data by ID.
 * - Handles HttpError appropriately.
 * - Verifies generic error handling.
 *
 * *updateAccount*
 * - Verifies successful account update response.
 * - Handles HttpError appropriately.
 * - Verifies generic error handling.
 *
 * *deleteAccount*
 * - Verifies successful response for account deletion.
 * - Handles HttpError appropriately.
 * - Verifies generic error handling.
 *
 * The tests utilize Sinon for method stubbing and Chai's `expect` for assertions.
 * Both positive and negative outcomes are covered to ensure thorough testing.
 */

/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library's and tool's import
import { Request, Response } from 'express'
import { expect } from 'chai'
import chalk from 'chalk'
import sinon from 'sinon'

// -DTO's import
import { createAccountDTO } from '@application/dtos/account/createAccount.dto'
import { updateAccountDTO } from '@application/dtos/account/updateAccount.dto'

// -Use Case's import and domain entity imports
import { CreateAccountUseCase } from '@application/use-cases/account/createAccountUseCase'
import { DeleteAccountUseCase } from '@application/use-cases/account/DeleteAccountUseCase'
import { UpdateAccountUseCase } from '@application/use-cases/account/updateAccountUseCase'
import { GetAccountUseCase } from '@application/use-cases/account/getAccountUseCase'

// -Controller's import
import { AccountController } from '@presentation/controllers/account.controller'

// -Entity's import
import { Account } from '@domain/entities/account.entity'

// -Utility's import for HTTP responses and error handling
import * as successResponseHttp from '@shared/utils/successResponseHttp'
import * as errorResponseHttp from '@shared/utils/errorResponseHttp'
import { HttpError } from '@shared/utils/error/httpError'

// -Constant's import for status codes
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'

// -Mock's import
import { updateAccountDTOMock, updatedAccountMock } from 'test/mocks/account/updateAccountMock'
import { createAccountMock } from 'test/mocks/account/createAccountMock'
import { accountMock } from 'test/mocks/account/accountMock'

describe(chalk.hex('#c6a363').bold('Account controller tests 🧑‍⚖️'), (): void => {
  let accountController: AccountController
  let createAccountUseCaseStub: sinon.SinonStubbedInstance<CreateAccountUseCase>
  let getAccountUseCaseStub: sinon.SinonStubbedInstance<GetAccountUseCase>
  let updateAccountUseCaseStub: sinon.SinonStubbedInstance<UpdateAccountUseCase>
  let deleteAccountUseCaseStub: sinon.SinonStubbedInstance<DeleteAccountUseCase>
  let req: Partial<Request & { params: { id: string } }>
  let res: Partial<Response>
  let successResponseStub: sinon.SinonStub
  let errorResponseStub: sinon.SinonStub

  /**
   * Mock instance of the 'Account' entity.
   *
   * @type {Account}
   */
  const accountInstance: Account = accountMock

  /**
   * Mock instance of the update 'Account' entity.
   *
   * @type {Account}
   */
  const updateAccountInstance: Account = updatedAccountMock

  /**
   * Setup before each test case.
   */
  beforeEach((): void => {
    // Create stub for the createAccountUseCase
    createAccountUseCaseStub = sinon.createStubInstance(CreateAccountUseCase)

    // Create stub for the getAccountUseCaseStub
    getAccountUseCaseStub = sinon.createStubInstance(GetAccountUseCase)

    // Create stub for the updateAccountUseCase
    updateAccountUseCaseStub = sinon.createStubInstance(UpdateAccountUseCase)

    // Create stub for the deleteAccountUseCase
    deleteAccountUseCaseStub = sinon.createStubInstance(DeleteAccountUseCase)

    // Create accountController
    accountController = new AccountController(createAccountUseCaseStub, getAccountUseCaseStub, updateAccountUseCaseStub, deleteAccountUseCaseStub)

    // Mock to response
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis()
    }

    // Create stub for success and error response handdles
    successResponseStub = sinon.stub(successResponseHttp, 'successResponseHttp')
    errorResponseStub = sinon.stub(errorResponseHttp, 'errorResponseHttp')
  })

  /**
   * Restore the original state of mocks after each test.
   */
  afterEach((): void => {
    sinon.restore()
  })

  describe('createAccount', async (): Promise<void> => {
    /**
     * Mock DTO for create account.
     *
     * @type {createAccountDTO}
     */
    const createAccountDTO: createAccountDTO = createAccountMock
    /**
     * Setup before each test case.
     */
    beforeEach((): void => {
      // Mock to request
      req = {
        body: createAccountDTO
      }
    })

    /**
     * Tests the scenario where the created account is successful.
     * Verifies that the correct status and account data are returned.
     *
     * @returns {Promise<void>}
     */
    it('should respond with status 201 and account data when created is successful', async (): Promise<void> => {
      createAccountUseCaseStub.execute.resolves(accountInstance)

      await accountController.createAccount(req as Request, res as Response)

      expect(createAccountUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.calledOnce).to.be.true
      expect(successResponseStub.calledOnceWith(sinon.match(res),
        {
          statusCode: successStatusCodes.CREATED,
          data: accountInstance,
          message: 'account successfully created'
        }
      )).to.be.true
    })

    /**
     * Tests handling of business logic errors such as an invalid user.
     * Ensures that the correct error response is sent and the error is an instance of HttpError.
     *
     * @throws {HttpError} - such as if the user is invalid
     * @returns {Promise<void>}
     */
    it('should handle HttpError', async (): Promise<void> => {
      const error = new HttpError(clientErrorStatusCodes.UNPROCESSABLE_ENTITY, 'invalid user Id')
      createAccountUseCaseStub.execute.rejects(error)

      await accountController.createAccount(req as Request, res as Response)

      expect(createAccountUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(sinon.match(res), error)).to.be.true
    })

    /**
     * Test handling of generic error. Verifies that the error is handled
     * and appropriate response is sent to the client.
     *
     * @throws {Error}
     * @returns {Promise<void>}
     */
    it('should handle generic Error and respond with error message', async (): Promise<void> => {
      const error = new Error('internal server error for sign up')

      createAccountUseCaseStub.execute.rejects(error)

      await accountController.createAccount(req as Request, res as Response)

      expect(createAccountUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(sinon.match(res), error)).to.be.true
    })
  })

  describe('getAccount', (): void => {
    /**
     * Setup before each test case.
     */
    beforeEach((): void => {
      // Mock to request
      req = {
        params: { id: String(accountInstance.id) }
      }
    })

    /**
     * Tests the scenario where the account is found.
     * Verifies that the correct status and account data are returned.
     *
     * @returns {Promise<void>}
     */
    it('should respond with status 200 and account data when account is found', async (): Promise<void> => {
      getAccountUseCaseStub.execute.resolves(accountInstance)

      await accountController.getAccount(req as Request, res as Response)

      expect(getAccountUseCaseStub.execute.calledOnce).to.be.true
      expect(successResponseStub.calledOnce).to.be.true
      expect(successResponseStub.calledOnceWith(sinon.match(res),
        {
          statusCode: successStatusCodes.OK,
          data: accountInstance,
          message: 'account successfully returned'
        }
      )).to.be.true
    })

    /**
     * Tests handling of business logic errors such as acount is not found.
     * Ensures that the correct error response is sent and the error is an instance of HttpError.
     *
     * @throws {HttpError} - such as account is not found.
     * @returns {Promise<void>}
     */
    it('should handle HttpError', async (): Promise<void> => {
      const error = new HttpError(clientErrorStatusCodes.NOT_FOUND, 'account not found')
      getAccountUseCaseStub.execute.rejects(error)

      await accountController.getAccount(req as Request, res as Response)

      expect(getAccountUseCaseStub.execute.calledOnce).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(sinon.match(res), error)).to.be.true
    })

    /**
     * Test handling of generic error. Verifies that the error is handled
     * and appropriate response is sent to the client.
     *
     * @throws {Error}
     * @returns {Promise<void>}
     */
    it('should handle generic Error and respond with error message', async (): Promise<void> => {
      const error = new Error('internal server error for sign up')

      getAccountUseCaseStub.execute.rejects(error)

      await accountController.getAccount(req as Request, res as Response)

      expect(getAccountUseCaseStub.execute.calledOnce).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(sinon.match(res), error)).to.be.true
    })
  })

  describe('updateAccount', (): void => {
    /**
     * Mock DTO for update account.
     *
     * @type {updateAccountDTO}
     */
    const updateAccountDTO: updateAccountDTO = updateAccountDTOMock

    beforeEach((): void => {
      // Mock to request
      req = {
        params: { id: String(updateAccountInstance.id) },
        body: updateAccountDTO
      }
    })

    /**
     * Tests the scenario where the updated account is successful.
     * Verifies that the correct status and account data updated are returned.
     *
     * @returns {Promise<void>}
     */
    it('should respond with status 200 and account data when update is successful', async (): Promise<void> => {
      updateAccountUseCaseStub.execute.resolves(updateAccountInstance)

      await accountController.updateAccount(req as Request, res as Response)

      expect(updateAccountUseCaseStub.execute.calledOnce).to.be.true
      expect(errorResponseStub.notCalled).to.be.true
      expect(successResponseStub.calledOnce).to.be.true
      expect(successResponseStub.calledOnceWith(sinon.match(res),
        {

          statusCode: successStatusCodes.OK,
          data: updateAccountInstance,
          message: 'account successfully updated'

        }
      )).to.be.true
    })

    /**
     * Tests handling of business logic errors such as acount is not found.
     * Ensures that the correct error response is sent and the error is an instance of HttpError.
     *
     * @throws {HttpError} - such as account is not found.
     * @returns {Promise<void>}
     */
    it('should handle HttpError', async (): Promise<void> => {
      const error = new HttpError(clientErrorStatusCodes.NOT_FOUND, 'account not found')
      updateAccountUseCaseStub.execute.rejects(error)

      await accountController.updateAccount(req as Request, res as Response)

      expect(updateAccountUseCaseStub.execute.calledOnce).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(sinon.match(res), error)).to.be.true
    })

    /**
     * Test handling of generic error. Verifies that the error is handled
     * and appropriate response is sent to the client.
     *
     * @throws {Error}
     * @returns {Promise<void>}
     */
    it('should handle generic Error and respond with error message', async (): Promise<void> => {
      const error = new Error('internal server error for update account')

      updateAccountUseCaseStub.execute.rejects(error)

      await accountController.updateAccount(req as Request, res as Response)

      expect(updateAccountUseCaseStub.execute.calledOnce).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(sinon.match(res), error)).to.be.true
    })
  })

  describe('deleteAccount', (): void => {
    /**
     * Setup before each test case.
     */
    beforeEach((): void => {
      // Mock to request
      req = {
        params: { id: String(accountInstance.id) }
      }
    })

    /**
     * Tests the scenario where the deleted account is successful.
     * Verifies that the correct status and account id deleted are returned.
     *
     * @returns {Promise<void>}
     */
    it('should respond with status 204 and id account when account is deleted successful', async (): Promise<void> => {
      deleteAccountUseCaseStub.execute.resolves()

      await accountController.deleteAccount(req as Request, res as Response)

      expect(deleteAccountUseCaseStub.execute.calledOnce).to.be.true
      expect(errorResponseStub.notCalled).to.be.true
      expect(successResponseStub.calledOnce).to.be.true
      expect(successResponseStub.calledOnceWith(sinon.match(res),
        {
          statusCode: successStatusCodes.NO_CONTENT,
          data: accountInstance.id,
          message: 'account successfully deleted'
        }
      )).to.be.true
    })

    /**
     * Tests handling of business logic errors such as acount is not found.
     * Ensures that the correct error response is sent and the error is an instance of HttpError.
     *
     * @throws {HttpError} - such as account is not found.
     * @returns {Promise<void>}
     */
    it('should handle HttpError', async (): Promise<void> => {
      const error = new HttpError(clientErrorStatusCodes.NOT_FOUND, 'account not found')
      deleteAccountUseCaseStub.execute.rejects(error)

      await accountController.deleteAccount(req as Request, res as Response)

      expect(deleteAccountUseCaseStub.execute.calledOnce).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(sinon.match(res), error)).to.be.true
    })

    /**
     * Test handling of generic error. Verifies that the error is handled
     * and appropriate response is sent to the client.
     *
     * @throws {Error}
     * @returns {Promise<void>}
     */
    it('should handle generic Error and respond with error message', async (): Promise<void> => {
      const error = new Error('internal server error for update account')

      deleteAccountUseCaseStub.execute.rejects(error)

      await accountController.deleteAccount(req as Request, res as Response)

      expect(deleteAccountUseCaseStub.execute.calledOnce).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(sinon.match(res), error)).to.be.true
    })
  })
})
