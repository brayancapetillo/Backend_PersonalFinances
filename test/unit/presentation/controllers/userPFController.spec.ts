/**
 * Unit test for the UserPFController's register method.
 *
 * This file contains a suite for tests that verify the behavior of the 'register'
 * method in the 'UserPFController' class. it tests different scenarios, inclugind:
 * -Successful registration response.
 * -Handling of HTTP-specific errors.
 * -Validation errors thrown by Zod.
 * -Generic error handling.
 *
 * The tests uses Sinon for stubbing methods, and Chai's expect for assertions.
 * Test cases ensure that both positive and negative outcomes are covered.
 */

/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { expect } from 'chai'
import chalk from 'chalk'
import Sinon from 'sinon'

// -DTO imports
import { registerUserPFDTO } from '@application/dtos/userPF/registerUserPF'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'

// -Use Case imports
import { RegisterUserPF } from '@application/use-cases/userPF/registerUserPF'

// -Controller imports
import { UserPFController } from '@presentation/controllers/userPF.controller'

// -Utility imports for HTTP responses and error handling
import * as successResponseHttp from '@shared/utils/successResponseHttp'
import * as errorResponseHttp from '@shared/utils/errorResponseHttp'
import { HttpError } from '@shared/utils/error/httpError'

// -Constant imports for status codes
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'

/**
 * Tests for the 'UserPF' controller.
 *
 * @group UserPF
 * The following tests focus on verifying the behavior of the UserPF controller
 * specifically for the user registration use case. These tests include success
 * scenarios as well as error handling for both business logic and validation errors.
 */
describe(chalk.hex('#c6a363').bold('UserPF controller tests 🧑‍⚖️'), (): void => {
  /**
   * Test suite for the 'register' method in the 'UserPF' controller.
   *
   * Verifies different outcomes of the register method when invoked with various
   * types of requests, including successful registration, HTTP errors, and validation errors.
   * @group register
   */
  describe('register controller test', (): void => {
    let userPFController: UserPFController
    let registerUserPFStub: Sinon.SinonStubbedInstance<RegisterUserPF>
    let req: Partial<Request>
    let res: Partial<Response>
    let successResponseStub: Sinon.SinonStub
    let errorResponseStub: Sinon.SinonStub

    /**
     * Mock DTO for registering a user.
     *
     * @type {registerUserPFDTO}
     */
    const userPFDTO: registerUserPFDTO = {
      email: 'brayanexample@example.com',
      name: 'brayan capetillo',
      lastName: null,
      birthday: null,
      phone: '4493465148',
      idSex: 1,
      idLenguage: 1,
      password: 'password123'
    }

    /**
     * Mock DTO for user summary.
     *
     * @type {userSummaryDTO}
     */
    const userSummary: userSummaryDTO = {
      id: 1,
      email: userPFDTO.email,
      name: userPFDTO.name,
      lastName: userPFDTO.lastName,
      birthday: userPFDTO.birthday,
      phone: userPFDTO.phone,
      idSex: userPFDTO.idSex,
      idLenguage: userPFDTO.idLenguage,
      verify: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    /**
     * Setup before each test case.
     */
    beforeEach((): void => {
      // Create stub for the RegisterUserPF
      registerUserPFStub = Sinon.createStubInstance(RegisterUserPF)

      // Create stub for success response and error response handlers
      successResponseStub = Sinon.stub(successResponseHttp, 'successResponseHttp')
      errorResponseStub = Sinon.stub(errorResponseHttp, 'errorResponseHttp')

      // Create userPFController
      userPFController = new UserPFController(registerUserPFStub)

      // mock to request
      req = {
        body: userPFDTO
      }

      // mock to response
      res = {
        status: Sinon.stub().returnsThis(),
        json: Sinon.stub().returnsThis(),
        send: Sinon.stub().returnsThis()
      }
    })

    /**
     * Restore the original state of mocks after each test.
     */
    afterEach(() => {
      Sinon.restore()
    })

    /**
     * Tests the scenario where the user registration is successful.
     * Verifies that the correct status and user data are returned.
     *
     * @returns {Promise<void>}
     */
    it('should respond with status 201 and user data when registration is successful', async (): Promise<void> => {
      registerUserPFStub.execute.resolves(userSummary)
      await userPFController.register(req as Request, res as Response)

      expect(registerUserPFStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.calledOnce).to.be.true
      expect(successResponseStub.calledOnceWith(Sinon.match(res), {
        statusCode: successStatusCodes.CREATED,
        data: userSummary,
        message: 'user successfully created'
      })).to.be.true
    })

    /**
     * Tests handling of business logic errors such as an email conflict.
     * Ensures that the correct error response is sent and the error is an instance of HttpError.
     *
     * @returns {Promise<void>}
     */
    it('should handle HttpError', async (): Promise<void> => {
      const error = new HttpError(clientErrorStatusCodes.CONFLICT, 'email address is already registered')
      registerUserPFStub.execute.rejects(error)

      await userPFController.register(req as Request, res as Response)

      expect(registerUserPFStub.execute.calledOnceWith(req.body)).to.be.true
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
    it('should handle ZodError', async () => {
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
      registerUserPFStub.execute.rejects(error)

      await userPFController.register(req as Request, res as Response)

      expect(registerUserPFStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(Sinon.match(res), error)).to.be.true
    })

    /**
     * Tests handling of generic errors. Verifies that the error is handled
     * and an appropriate response is sent to the client.
     *
     * @returns {Promise<void>}
     */
    it('should handle generic Error and respond with error message', async () => {
      const error = new Error('Error registering user')
      registerUserPFStub.execute.rejects(error)

      await userPFController.register(req as Request, res as Response)

      expect(registerUserPFStub.execute.calledOnceWith(req.body)).to.be.true
      expect(successResponseStub.notCalled).to.be.true
      expect(errorResponseStub.calledOnce).to.be.true
      expect(errorResponseStub.calledOnceWith(Sinon.match(res), error)).to.be.true
    })
  })
})
