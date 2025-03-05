/**
 * Unit tests for the AuthController class.
 *
 * This file contains a suite of tests that verify the behavior of the 'signUp', 'signIn', and 'refreshToken'
 * methods in the AuthController class. The tests cover various scenarios, including successful operations,
 * handling of HttpErrors, and generic error handling.
 *
 * ### Test Scenarios:
 *
 * *signUp*
 * - Verifies successful sign-up response.
 * - Handles HttpErrors appropriately.
 * - Verifies generic error handling.
 *
 * *signIn*
 * - Verifies successful sign-in response.
 * - Handles HttpErrors appropriately.
 * - Verifies generic error handling.
 *
 * *refreshToken*
 * - Verifies successful refresh token response.
 * - Handles HttpErrors appropriately.
 * - Verifies generic error handling.
 *
 * The tests use Sinon for method stubbing and Chai's `expect` for assertions.
 * Both positive and negative outcomes are covered to ensure comprehensive testing.
 */

/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library's and tool's import
import { Request, Response } from 'express'
import { expect } from 'chai'
import chalk from 'chalk'
import Sinon from 'sinon'

// -DTO's import
import { refreshTokenDTO, tokenSummary } from '@application/dtos/auth/refreshToken.dto'
import { signInDTO, signInSummary } from '@application/dtos/auth/signIn.dto'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'
import { signUpDTO } from '@application/dtos/auth/signUp.dto'

// -Use Case's import
import { RefreshTokenUseCase } from '@application/use-cases/auth/refreshTokenUseCase'
import { SignUpUseCase } from '@application/use-cases/auth/signUpCaseUse'
import { SignInUseCase } from '@application/use-cases/auth/signInUseCase'

// -Controller's import
import { AuthController } from '@presentation/controllers/auth.controller'

// -Service's import
import { TokenService } from '@infrastructure/services/jwt/token.service'

// -Utility's import for HTTP responses and error handling
import * as successResponseHttp from '@shared/utils/successResponseHttp'
import * as errorResponseHttp from '@shared/utils/errorResponseHttp'
import { HttpError } from '@shared/utils/error/httpError'

// -Constant's import for status codes
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'

// -Mock's import
import { tokenSummaryMock } from 'test/mocks/auth/tokenSummaryMock'
import { userSummaryMock } from 'test/mocks/userPF/userSummaryMock'
import { signUpMock } from 'test/mocks/auth/signUpMock'
import { signInMock } from 'test/mocks/auth/signInMock'

describe(chalk.hex('#c6a363').bold('Auth controller tests 🧑‍⚖️'), (): void => {
  let authController: AuthController
  let tokenServiceStub: Sinon.SinonStubbedInstance<TokenService>
  let signUpUseCaseStub: Sinon.SinonStubbedInstance<SignUpUseCase>
  let signInUseCaseStub: Sinon.SinonStubbedInstance<SignInUseCase>
  let refreshTokenUseCaseStub: Sinon.SinonStubbedInstance<RefreshTokenUseCase>
  let req: Partial<Request>
  let res: Partial<Response>
  let successResponseStub: Sinon.SinonStub
  let errorResponseStub: Sinon.SinonStub

  /**
   * Setup before each test case.
   */
  beforeEach((): void => {
    // Create TokenService
    tokenServiceStub = Sinon.createStubInstance(TokenService)

    // Create stub for the signUpUseCase
    signUpUseCaseStub = Sinon.createStubInstance(SignUpUseCase)

    // Create stub for the signInUseCase
    signInUseCaseStub = Sinon.createStubInstance(SignInUseCase)

    // Create stub for the refreshTokenUseCase
    refreshTokenUseCaseStub = Sinon.createStubInstance(RefreshTokenUseCase)

    // Create stub for success and error response handdles
    successResponseStub = Sinon.stub(successResponseHttp, 'successResponseHttp')
    errorResponseStub = Sinon.stub(errorResponseHttp, 'errorResponseHttp')

    // Create AuthController
    authController = new AuthController(signUpUseCaseStub, signInUseCaseStub, refreshTokenUseCaseStub)

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

  describe('signUp', (): void => {
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
      // Mock to request
      req = {
        body: signUpDTO
      }
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

  describe('signIn', (): void => {
    /**
    * Mock DTO for sign in user.
    *
    * @type {signInDTO}
    */
    const signInDTO: signInDTO = signInMock

    /**
     * Mock DTO for tokenSummary
     *
     * @type {tokenSummary}
     */
    const tokenSummary: tokenSummary = tokenSummaryMock

    beforeEach((): void => {
      // Mock to request
      req = {
        body: signInDTO
      }
    })

    /**
     * Tests the scenario where the user sign in is successful.
     * Verifies that the correct status and returns access and refresh tokens.
     *
     * @returns {Promise<void>}
     */
    it('should respond with status 200 and tokens when sign in is successful', async (): Promise<void> => {
      signInUseCaseStub.execute.resolves(tokenSummary)

      await authController.signIn(req as Request, res as Response)

      expect(signInUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.calledOnce).to.be.true
      expect(successResponseStub.calledOnceWith(Sinon.match(res),
        {
          statusCode: successStatusCodes.OK,
          data: tokenSummary,
          message: 'successful signin'
        }
      )).to.be.true
    })

    /**
     * Tests handling of business logic errors such as an user not found.
     * Ensures that the correct error response is sent and the error is an instance of HttpError.
     *
     * @returns {Promise<void>}
     */
    it('should handle HttpError', async (): Promise<void> => {
      const error = new HttpError(clientErrorStatusCodes.UNAUTHORIZED, 'user not found')
      signInUseCaseStub.execute.rejects(error)

      await authController.signIn(req as Request, res as Response)

      expect(signInUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
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
      const error = new Error('internal server error for sign in')

      signInUseCaseStub.execute.rejects(error)

      await authController.signIn(req as Request, res as Response)

      expect(signInUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(Sinon.match(res), error)).to.be.true
    })
  })

  describe('refreshToken', (): void => {
    /**
     * Mock DTO for access and refresh tokens
     *
     * @type {tokenSummary}
     */
    const refreshTokensMock: tokenSummary = tokenSummaryMock

    /**
     * Mock DTO for refresh token
     *
     * @type {refreshTokenDTO}
     */
    const refreshTokenDTO: refreshTokenDTO = refreshTokensMock

    /**
     * Mock DTO for user summary.
     *
     * @type {signInSummary}
     */
    const signInSummary: signInSummary = { id: userSummaryMock.id, name: userSummaryMock.name }

    /**
     * Setup before each test case
     */
    beforeEach((): void => {
      req = {
        body: refreshTokenDTO
      }
    })

    /**
     * Tests the scenario where the tokens refreshs sucessfull.
     * Verifies correct status and returns refreshed tokens.
     *
     * @returns {Promise<void>}
     */
    it('should respond with status 200 and return refresh tokens', async (): Promise<void> => {
      refreshTokenUseCaseStub.execute.returns(refreshTokensMock)
      tokenServiceStub.verifyRefreshToken.returns(signInSummary)

      await authController.refreshToken(req as Request, res as Response)

      expect(refreshTokenUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.calledOnce).to.be.true
      expect(successResponseStub.calledOnceWith(Sinon.match(res),
        {
          statusCode: successStatusCodes.OK,
          data: refreshTokensMock,
          message: 'token successfully refresh'
        }
      )).to.be.true
    })

    /**
     * Tests handling of business logic errors such as refresh token invalid.
     * Ensures that the correct error response is sent and the error is an instance of HttpError.
     *
     * @returns {Promise<void>}
     */
    it('should handle HttpError', async (): Promise<void> => {
      const error = new HttpError(clientErrorStatusCodes.UNAUTHORIZED, 'invalid refresh token')
      refreshTokenUseCaseStub.execute.throws(error)

      await authController.refreshToken(req as Request, res as Response)

      expect(refreshTokenUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
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
      const error = new Error('internal server error for refresh token')

      refreshTokenUseCaseStub.execute.throws(error)

      await authController.refreshToken(req as Request, res as Response)

      expect(refreshTokenUseCaseStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(Sinon.match(res), error)).to.be.true
    })
  })
})
