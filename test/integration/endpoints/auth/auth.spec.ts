/**
 * Integration test suite for the 'sign up' and 'sign In' endpoint in the auth route.
 *
 * This suite tests the '/auth/signUp' endpoint, covering various scenarios:
 * - Successful user sign up
 * - Handling of HTTP-specific errors
 * - Validation errors thrown by Zod
 * - Generic error handling
 *
 * This suite tests the '/auth/signIn' endpoint, covering various scenarios:
 * - Successful user sign In
 * - Handling of HTTP-specific errors
 * - Validation errors thrown by Zod
 * - Generic error handling
 * Test cases include both positive and negative results to ensure robust coverage.
 *
 * @module AuthTest
 */

/* eslint-disable @typescript-eslint/no-unused-expressions */
// -App imports
import app from 'src/main/app'

// -Library's and tool's import
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { ZodIssue } from 'zod'
import chalk from 'chalk'
import Sinon from 'sinon'

// -DTO's import
import { tokenSummary } from '@application/dtos/auth/tokenSummary.dto'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'
import { signUpDTO } from '@application/dtos/auth/signUp.dto'
import { signInDTO } from '@application/dtos/auth/signIn.dto'

// -Constant's import for status codes
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { serverErrorStatusCodes } from '@shared/constants/http/serverStatusCode'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'

// -Repository's import
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'

// -Mock's import
import { signUpMock } from 'test/mocks/auth/signUpMock'
import { signInMock } from 'test/mocks/auth/signInMock'

// -Prisma import
import prisma from '@infrastructure/database/prisma/prismaClient'

chai.use(chaiHttp)

describe(chalk.hex('#c6a363').bold('Auth endpoints tests 🛤️'), () => {
  let idUser: number = 0
  describe('POST /auth/signUp', (): void => {
    let sandbox: Sinon.SinonSandbox
    let requestBody: signUpDTO = signUpMock

    /**
     * Setup the Sinon sandbox before each test.
     */
    beforeEach(() => {
      sandbox = Sinon.createSandbox()

      requestBody = { ...signUpMock }
    })

    /**
     * Restore the original state of mocks after each test.
     */
    afterEach(() => {
      sandbox.restore()
    })

    /**
     * test successful user sign Up.
     * It verifies that a new user is successfully sign up and returns the correct response.
     *
     * @returns {Promise<void>}
     */
    it('should successfully sign up a new user', async (): Promise<void> => {
      // Make the HTTP request to the signUp endpoint
      const response = await chai.request(app).post('/_api/v/auth/signUp').send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(successStatusCodes.CREATED)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', true)
      expect(body).to.have.property('data')
      expect(body).to.have.property('message', 'USER SUCCESSFULLY CREATED')

      const data: userSummaryDTO = body.data

      // Validate returned data properties
      expect(data).to.deep.include({
        email: requestBody.email,
        name: requestBody.name,
        lastName: requestBody.lastName,
        birthday: requestBody.birthday,
        phone: requestBody.phone,
        idSex: requestBody.idSex,
        idLenguage: requestBody.idLenguage,
        verify: false
      })

      // Ensure returned dates are valid
      expect(new Date(data.createdAt)).to.be.a('date')
      expect(new Date(data.updatedAt)).to.be.a('date')

      idUser = data.id
    })

    /**
     * Test error handling when the email is already registered.
     *
     * @returns {Promise<void>}
     */
    it('should return an error if the email is already registered', async (): Promise<void> => {
      // Make the HTTP request to the signUp endpoint
      const response = await chai.request(app).post('/_api/v/auth/signUp').send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.CONFLICT)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message', 'email address is already registered')
    })

    /**
     * Test error handling when the number phone is already registered.
     *
     * @returns {Promise<void>}
     */
    it('should return an error if the number phone is already registered', async (): Promise<void> => {
      // Make the HTTP request to the signUp endpoint
      requestBody.email = 'brayanexample1@example.com'
      const response = await chai.request(app).post('/_api/v/auth/signUp').send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.CONFLICT)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message', 'phone number is already registered')
    })

    /**
     * Test error handling for invalid request body.
     *
     * @returns {Promise<void>}s
     */
    it('should return an error if request body is invalid', async (): Promise<void> => {
      // Make the HTTP request to the signUp endpoint
      const response = await chai.request(app).post('/_api/v/auth/signUp').send({})

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.BAD_REQUEST)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body.error.issues).to.be.an('array')

      body.error.issues.forEach((error: ZodIssue) => {
        expect(error).to.have.property('code')
        expect(error).to.have.property('expected')
        expect(error).to.have.property('received')
        expect(error).to.have.property('path')
        expect(error).to.have.property('message')
      })
    })

    /**
     * Test error handling for internal server errors.
     *
     * @returns {Promise<void>}
     */
    it('should return an error if an internal server error occurs', async (): Promise<void> => {
      requestBody.email = 'brayanexample1@example.com'
      requestBody.phone = '0000000001'
      sandbox.stub(UserPFPrismaRepository.prototype, 'create').rejects(new Error('internal server error test'))
      // Make the HTTP request to the signUp endpoint
      const response = await chai.request(app).post('/_api/v/auth/signUp').send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(serverErrorStatusCodes.INTERNAL_SERVER_ERROR)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message')
    })
  })

  describe('POST /auth/signIn', (): void => {
    let sandbox: Sinon.SinonSandbox
    let requestBody: signInDTO = signInMock

    /**
     * Setup the Sinon sandbox before each test.
     */
    beforeEach((): void => {
      sandbox = Sinon.createSandbox()

      requestBody = { ...signInMock }
    })

    /**
     * Restore the original state of mocks after each test.
     */
    afterEach((): void => {
      sandbox.restore()
    })

    /**
     * Test successful user sign in.
     *
     * It verifies that a user successful sign in and return correct response.
     *
     * @return {Promise<void>}
     */
    it('should successful sign in a user', async (): Promise<void> => {
      // Make the HTTP request to the signIn endpoint
      const response = await chai.request(app).post('/_api/v/auth/signIn').send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(successStatusCodes.OK)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', true)
      expect(body).to.have.property('data')
      expect(body).to.have.property('message', 'SUCCESSFUL SIGNIN')

      const data: tokenSummary = body.data

      // Validate returned data properties
      expect(data).to.have.property('accessToken')
      expect(data).to.have.property('refreshToken')
    })

    /**
     * Test error handling when the user is not found.
     *
     * @return {Promise<void>}
     */
    it('should return an error if the user is not found', async (): Promise<void> => {
      // Make the HTTP request to the signIn endpoint
      requestBody.email = 'notfound@example.com'
      const response = await chai.request(app).post('/_api/v/auth/signIn').send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.UNAUTHORIZED)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message', 'user not found')
    })

    /**
     * Test error handling when the user enters an incorrect password.
     *
     * @return {Promise<void>}
     */
    it('should return an error if the user enters an incorrect password', async (): Promise<void> => {
      // Make the HTTP request to the signIn endpoint
      requestBody.password = 'passwordInvalid'
      const response = await chai.request(app).post('/_api/v/auth/signIn').send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.FORBIDDEN)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message', 'incorrect password')
    })

    /**
     * Test error handling for invalid request body.
     *
     * @returns {Promise<void>}s
     */
    it('should return an error if request body is invalid', async (): Promise<void> => {
      // Make the HTTP request to the signIn endpoint
      const response = await chai.request(app).post('/_api/v/auth/signIn').send({})

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.BAD_REQUEST)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body.error.issues).to.be.an('array')

      body.error.issues.forEach((error: ZodIssue) => {
        expect(error).to.have.property('code')
        expect(error).to.have.property('expected')
        expect(error).to.have.property('received')
        expect(error).to.have.property('path')
        expect(error).to.have.property('message')
      })
    })

    /**
     *
     */
    it('should return an error if an internal server error occurs', async (): Promise<void> => {
      sandbox.stub(UserPFPrismaRepository.prototype, 'findByEmail').rejects(new Error('internal server error test'))
      // Make the HTTP request to the signIn endpoint
      const response = await chai.request(app).post('/_api/v/auth/signIn').send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(serverErrorStatusCodes.INTERNAL_SERVER_ERROR)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message')
    })
  })

  after(async () => {
    await prisma.userPF.delete({ where: { id: idUser } })
  })
})
