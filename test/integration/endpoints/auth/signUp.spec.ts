/**
 * Integration test suite for the 'sign up' endpoint in the auth route.
 *
 * This suite tests the '/auth/signUp' endpoint, covering various scenarios:
 * - Successful user sign up
 * - Handling of HTTP-specific errors
 * - Validation errors thrown by Zod
 * - Generic error handling
 *
 * Test cases include both positive and negative results to ensure robust coverage.
 *
 * @module AuthSignUpTest
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
import { signUpDTO } from '@application/dtos/auth/signUp.dto'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'

// -Constant's import for status codes
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { serverErrorStatusCodes } from '@shared/constants/http/serverStatusCode'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'

// -Repository's import
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'

// -Mock's import
import { signUpMock } from 'test/mocks/auth/signUpMock'

// -Prisma import
import prisma from '@infrastructure/database/prisma/prismaClient'

chai.use(chaiHttp)

describe(chalk.hex('#c6a363').bold('userPF endpoints tests 🛤️'), () => {
  let idUser: number = 0
  describe('POST /auth/signUp', (): void => {
    let sandbox: Sinon.SinonSandbox
    const requestBody: signUpDTO = signUpMock

    /**
     * Setup the Sinon sandbox before each test.
     */
    beforeEach(() => {
      sandbox = Sinon.createSandbox()
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

  after(async () => {
    await prisma.userPF.delete({ where: { id: idUser } })
  })
})
