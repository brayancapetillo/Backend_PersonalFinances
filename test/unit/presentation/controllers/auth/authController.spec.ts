/**
 * Unit test for the AuthController's sign up method.
 *
 * This files contains a suite for test that verify the behavior of the 'signUp'
 * method in the 'AuthController' class. It tests differents scenarios, including:
 * -Successful sign up response.
 * -Handling of HttpErrors.
 * -Validation errors thrown by Zod.
 * -Generic errors handling.
 *
 * The tests uses sinon for the stubbing methods, and Chai's expect for assertions.
 * Test cases ensure that both positive and negative outcomes are covered.
 */

/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library's and tool's import
import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { expect } from 'chai'
import chalk from 'chalk'
import Sinon from 'sinon'

// -DTO's import
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'
import { signUpDTO } from '@application/dtos/auth/signUp.dto'

// -Use Case's import
import { SignUpUseCase } from '@application/use-cases/auth/signUpCaseUse'

// -Controller's import
import { AuthController } from '@presentation/controllers/auth.controller'

// -Utility's import for HTTP responses and error handling
import * as successResponseHttp from '@shared/utils/successResponseHttp'
import * as errorResponseHttp from '@shared/utils/errorResponseHttp'
import { HttpError } from '@shared/utils/error/httpError'

// -Constant's import for status codes
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'

// -Mock's import
import { userSummaryMock } from 'test/mocks/userPF/userSummaryMock'
import { signUpMock } from 'test/mocks/auth/signUpMock'

describe(chalk.hex('#c6a363').bold('Auth controller tests 🧑‍⚖️'), (): void => {
  describe('sign up, controller test', (): void => {
    let authController: AuthController
    let signUpUseCaseStub: Sinon.SinonStubbedInstance<SignUpUseCase>
    let req: Partial<Request>
    let res: Partial<Response>
    let successResponseStub: Sinon.SinonStub
    let errorResponseStub: Sinon.SinonStub

    /**
     * Mock DTO for sign up a user.
     *
     * @type {signUpDTO}
     */
    const signUpDTO: signUpDTO = signUpMock

    /**
     * Mock DTO for user summary.
     *
     * @type {userSummaryDTO}
     */
    const userSummary: userSummaryDTO = userSummaryMock

    /**
     * Setup before each test case.
     */

    beforeEach((): void => {
      // Create stub for the signUpUseCase
      signUpUseCaseStub = Sinon.createStubInstance(SignUpUseCase)

      // Create stub for success and error response handdles
      successResponseStub = Sinon.stub(successResponseHttp, 'successResponseHttp')
      errorResponseStub = Sinon.stub(errorResponseHttp, 'errorResponseHttp')

      // Create AuthController
      authController = new AuthController(signUpUseCaseStub)

      // Mock to request
      req = {
        body: signUpDTO
      }

      // Mock to response
      res = {
        status: Sinon.stub().returnsThis(),
        json: Sinon.stub().returnsThis(),
        send: Sinon.stub().returnsThis()
      }
    })

    /**
     * Restore the original state of mocks after each test.
     */
    afterEach((): void => {
      Sinon.restore()
    })

    /**
     * Tests the scenario where the user sign up is successful.
     * Verifies that the correct status and user data are returned.
     *
     * @returns {Promise<void>}
     */
    it('should respond with status 201 and user data when sign up is successful', async (): Promise<void> => {
      signUpUseCaseStub.execute.resolves(userSummary)

      await authController.signUp(req as Request, res as Response)

      expect(signUpUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.calledOnce).to.be.true
      expect(successResponseStub.calledOnceWith(Sinon.match(res),
        {
          statusCode: successStatusCodes.CREATED,
          data: userSummary,
          message: 'user successfully created'
        }
      )).to.be.true
    })

    /**
     * Tests handling of business logic errors such as an email conflict.
     * Ensures that the correct error response is sent and the error is an instance of HttpError.
     *
     * @returns {Promise<void>}
     */
    it('should handle HttpError', async (): Promise<void> => {
      const error = new HttpError(clientErrorStatusCodes.CONFLICT, 'email address is already registered')
      signUpUseCaseStub.execute.rejects(error)

      await authController.signUp(req as Request, res as Response)

      expect(signUpUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(Sinon.match(res), error)).to.be.true
    })

    /**
     * Tests handling of validation errors thrown by Zod.
     * Verifies that the validation error is properly caught and an error response is sent
     * and the error is an instance of zodError.
     *
     * @returns {Promise<void>}
     */
    it('should handle ZodError', async (): Promise<void> => {
      const error = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: [
            'email'
          ],
          message: 'email is required'
        }
      ])

      signUpUseCaseStub.execute.rejects(error)

      await authController.signUp(req as Request, res as Response)

      expect(signUpUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(Sinon.match(res), error)).to.be.true
    })

    /**
     * Test handling of generic error. Verifies that the error is handled
     * and appropriate response is sent to the client.
     *
     * @returns {Promise<void>}
     */
    it('should handle generic Error and respond with error message', async (): Promise<void> => {
      const error = new Error('internal server error for sign up')

      signUpUseCaseStub.execute.rejects(error)

      await authController.signUp(req as Request, res as Response)

      expect(signUpUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(Sinon.match(res), error)).to.be.true
    })
  })
})
