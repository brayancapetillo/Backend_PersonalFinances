/**
 * Integration test suite for the 'register' endpoint in the user route.
 *
 * This suite tests the '/user/register' endpoint, covering various scenarios:
 * - Successful user registration
 * - Handling of HTTP-specific errors
 * - Validation errors thrown by Zod
 * - Generic error handling
 *
 * Test cases include both positive and negative results to ensure robust coverage.
 *
 * @module userRegistrationTests
 */

// -App imports
import app from 'src/main/app'

// -Library and tool imports
import chaiHttp from 'chai-http'
import { ZodIssue } from 'zod'
import Sinon from 'sinon'
import chalk from 'chalk'
import chai from 'chai'

// -DTO imports
import { registerUserPFDTO } from '@application/dtos/userPF/registerUserPF'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'

// -Repository and domain entity imports
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'
import { UserPF } from '@domain/entities/userPF.entity'

// -Mock imports
import { createMockUser } from 'test/mocks/userPF/userPFMock'

// -Constant imports for status codes
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { serverErrorStatusCodes } from '@shared/constants/http/serverStatusCode'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'

const { expect } = chai
chai.use(chaiHttp)

describe(chalk.hex('#c6a363').bold('userPF endpoints tests 🛤️'), () => {
  describe('POST /user/register', (): void => {
    let sandbox: Sinon.SinonSandbox
    const mockedUser: UserPF = createMockUser()

    /**
       * Mock DTO for registering a user.
       * Send to request body
       *
       * @type {registerUserPFDTO}
       */
    const requestBody: registerUserPFDTO = {
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
     * Test successful user registration.
     * It verifies that a new user is successfully registered and returns the correct response.
     *
     * @returns {Promise<void>}
     */
    it('should successfully register a new user', async (): Promise<void> => {
      // Stubbing repository methods
      sandbox.stub(UserPFPrismaRepository.prototype, 'findByEmail').resolves(null)
      sandbox.stub(UserPFPrismaRepository.prototype, 'findByPhone').resolves(null)
      sandbox.stub(UserPFPrismaRepository.prototype, 'register').resolves(mockedUser)

      // Make the HTTP request to the registration endpoint
      const res = await chai.request(app)
        .post('/user/register')
        .send(requestBody)

      // Verify response headers
      expect(res.headers['content-type']).to.include('application/json')
      expect(res.status).to.equal(successStatusCodes.CREATED)

      // Verify response body
      const { body } = res
      expect(body).to.have.property('success', true)
      expect(body).to.have.property('data')
      expect(body).to.have.property('message', 'USER SUCCESSFULLY CREATED')

      const data: userSummaryDTO = body.data

      // Validate returned data properties
      expect(data).to.deep.include({
        id: mockedUser.id,
        email: mockedUser.email,
        name: mockedUser.name,
        lastName: mockedUser.lastName,
        birthday: mockedUser.birthday,
        phone: mockedUser.phone,
        idSex: mockedUser.idSex,
        idLenguage: mockedUser.idLenguage,
        verify: mockedUser.verify
      })

      // Ensure returned dates are valid
      expect(new Date(data.createdAt)).to.be.a('date')
      expect(new Date(data.updatedAt)).to.be.a('date')
    })

    /**
     * Test error handling when the email is already registered.
     *
     * @returns {Promise<void>}
     */
    it('should return an error if the email is already registered', async (): Promise<void> => {
      // Stubbing repository method for findByEmail
      sandbox.stub(UserPFPrismaRepository.prototype, 'findByEmail').resolves(mockedUser)

      // Make the HTTP request to the registration endpoint
      const res = await chai.request(app)
        .post('/user/register')
        .send(requestBody)

      // Verify response headers
      expect(res.headers['content-type']).to.include('application/json')
      expect(res.status).to.equal(clientErrorStatusCodes.CONFLICT)

      // Verify response body
      const { body } = res
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
      // Stubbing repository methods
      sandbox.stub(UserPFPrismaRepository.prototype, 'findByEmail').resolves(null)
      sandbox.stub(UserPFPrismaRepository.prototype, 'findByPhone').resolves(mockedUser)

      // Make the HTTP request to the registration endpoint
      const res = await chai.request(app)
        .post('/user/register')
        .send(requestBody)

      // Verify response headers
      expect(res.headers['content-type']).to.include('application/json')
      expect(res.status).to.equal(clientErrorStatusCodes.CONFLICT)

      // Verify response body
      const { body } = res
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
      // Make the HTTP request to the registration endpoint
      const res = await chai.request(app)
        .post('/user/register')
        .send({})

      // Verify response headers
      expect(res.headers['content-type']).to.include('application/json')
      expect(res.status).to.equal(clientErrorStatusCodes.BAD_REQUEST)

      // Verify response body
      const { body } = res
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
      // Stubbing repository methods
      sandbox.stub(UserPFPrismaRepository.prototype, 'findByEmail').resolves(null)
      sandbox.stub(UserPFPrismaRepository.prototype, 'findByPhone').resolves(null)
      sandbox.stub(UserPFPrismaRepository.prototype, 'register').rejects(new Error('internal server error test'))

      // Make the HTTP request to the registration endpoint
      const res = await chai.request(app)
        .post('/user/register')
        .send(requestBody)

      // Verify response headers
      expect(res.headers['content-type']).to.include('application/json')
      expect(res.status).to.equal(serverErrorStatusCodes.INTERNAL_SERVER_ERROR)

      // Verify response body
      const { body } = res
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message')
    })
  })
})
