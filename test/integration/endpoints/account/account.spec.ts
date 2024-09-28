/**
 * Integration test suite for the 'POST /account/', 'GET /account/:id', 'PUT /account/:id',
 * and 'DELETE /account/:id' endpoints within the account route.
 *
 * ### This suite comprehensively tests each endpoint, covering various scenarios:
 *
 * + **POST /account/**:
 *   - Successfully creates a new account.
 *   - Handles HTTP-specific errors (e.g., 400, 500).
 *   - Manages validation errors thrown by Zod (e.g., invalid input).
 *   - Tests generic error handling.
 *
 * + **GET /account/:id**:
 *   - Successfully retrieves account data by ID.
 *   - Handles HTTP-specific errors (e.g., 404 if account not found).
 *   - Manages validation errors thrown by Zod (e.g., invalid ID format).
 *   - Tests generic error handling.
 *
 * + **PUT /account/:id**:
 *   - Successfully update an account by ID and request body.
 *   - Handles HTTP-specific errors (e.g., 400, 404).
 *   - Manages validation errors thrown by Zod (e.g., invalid input).
 *   - Tests generic error handling.
 *
 * + **DELETE /account/:id**:
 *   - Successfully deletes an account by ID.
 *   - Handles HTTP-specific errors (e.g., 404 if account not found).
 *   - Manages validation errors thrown by Zod (e.g., invalid ID format).
 *   - Tests generic error handling.
 *
 * ### Test coverage:
 * Each test ensures that the endpoints respond correctly to both valid and invalid inputs,
 * focusing on proper error handling and validation.
 *
 * @module AccountTest
 */

/* eslint-disable @typescript-eslint/no-unused-expressions */
// -App imports
import app from 'src/main/app'

// -Library's and tool's import
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { ZodIssue } from 'zod'
import chalk from 'chalk'
import sinon from 'sinon'

// -DTO's import
import { createAccountDTO } from '@application/dtos/account/createAccount.dto'
import { updateAccountDTO } from '@application/dtos/account/updateAccount.dto'

// -Constant's import for status codes
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { serverErrorStatusCodes } from '@shared/constants/http/serverStatusCode'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'

// -Repository's import
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'

// -Helper's import
import { generateTokenIT } from 'test/unit/shared/helpers/tokenIT'

// -Mock's import
import { createAccountMock, createSecundAccountMock } from 'test/mocks/account/createAccountMock'
import { updateAccountDTOMock } from 'test/mocks/account/updateAccountMock'

// -Prisma import
// import prisma from '@infrastructure/database/prisma/prismaClient'

chai.use(chaiHttp)

describe(chalk.hex('#c6a363').bold('Account endpoints tests 🛤️'), () => {
  let idAccount: number = 0
  let idSecundAccount: number = 0
  let sandbox: sinon.SinonSandbox
  let token: string = ''

  /**
   * Setup the token for integration test
   */
  before(async (): Promise<void> => {
    token = await generateTokenIT()
  })

  describe('POST /account/', (): void => {
    let requestBody: createAccountDTO = createAccountMock
    let requestTwoBody: createAccountDTO = createSecundAccountMock

    /**
     * Setup the Sinon sandbox before each test.
     */
    beforeEach((): void => {
      sandbox = sinon.createSandbox()

      requestBody = { ...createAccountMock }
      requestTwoBody = { ...createSecundAccountMock }
    })

    /**
     * Restore the original state of mocks after each test.
     */
    afterEach((): void => {
      sandbox.restore()
    })

    /**
     * Test for successful account creation.
     *
     * Verifies that a new account is created and the response contains
     * the expected status, headers, and body with valid account data.
     *
     * @returns {Promise<void>}
     */
    it('should successfully create a new account', async (): Promise<void> => {
      // Make the HTTP request to the post account endpoint
      const response = await chai.request(app).post('/_api/v/account/').set('Authorization', `Bearer ${token}`).send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(successStatusCodes.CREATED)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', true)
      expect(body).to.have.property('data')
      expect(body).to.have.property('message', 'ACCOUNT SUCCESSFULLY CREATED')

      const { data } = body

      expect(data).to.deep.include({
        idUser: requestBody.idUser,
        name: requestBody.name,
        idBank: requestBody.idBank,
        idAccountType: requestBody.idAccountType,
        balance: requestBody.balance,
        accountNumber: requestBody.accountNumber
      })

      // Ensure returned dates are valid
      expect(new Date(data.createdAt)).to.be.a('date')
      expect(new Date(data.updatedAt)).to.be.a('date')

      idAccount = data.id
    })

    /**
     * Test for the successful creation of a second account.
     *
     * This test verifies that a second account is created and the response contains
     * the expected status, headers, and body with valid account data.
     *
     * @returns {Promise<void>}
     */
    it('should successfully create a second account', async (): Promise<void> => {
      // Make the HTTP request to the post account endpoint
      const response = await chai.request(app).post('/_api/v/account/').set('Authorization', `Bearer ${token}`).send(requestTwoBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(successStatusCodes.CREATED)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', true)
      expect(body).to.have.property('data')
      expect(body).to.have.property('message', 'ACCOUNT SUCCESSFULLY CREATED')

      const { data } = body

      expect(data).to.deep.include({
        idUser: requestTwoBody.idUser,
        name: requestTwoBody.name,
        idBank: requestTwoBody.idBank,
        idAccountType: requestTwoBody.idAccountType,
        balance: requestTwoBody.balance,
        accountNumber: requestTwoBody.accountNumber
      })

      // Ensure returned dates are valid
      expect(new Date(data.createdAt)).to.be.a('date')
      expect(new Date(data.updatedAt)).to.be.a('date')

      idSecundAccount = data.id
    })

    /**
     * Test error handling when an invalid user ID is provided.
     *
     * Verifies that the system returns an appropriate error response
     * when attempting to create an account with an invalid user ID.
     *
     * @throws {HttpError} - If the user is invalid.
     * @returns {Promise<void>}
     */
    it('should return an error if the user is invalid', async (): Promise<void> => {
      requestBody.idUser = 9999999999
      // Make the HTTP request to the post account endpoint
      const response = await chai.request(app).post('/_api/v/account/').set('Authorization', `Bearer ${token}`).send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.UNPROCESSABLE_ENTITY)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message', 'invalid user Id')
    })

    /**
     * Test error handling when an account number is already registered.
     *
     * Verifies that the system returns an appropriate error response
     * when attempting to create an account with a duplicate account number.
     *
     * @throws {HttpError} - If the account number is already registered.
     * @returns {Promise<void>}
     */
    it('should return an error if the account number is already registered', async (): Promise<void> => {
      // Make the HTTP request to the post account endpoint
      const response = await chai.request(app).post('/_api/v/account/').set('Authorization', `Bearer ${token}`).send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.CONFLICT)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message', 'account number is already registered')
    })

    /**
     * Test error handling for an invalid request body.
     *
     * Verifies that the system returns a `BAD_REQUEST` error response
     * when attempting to create an account with an invalid or empty request body.
     *
     * @throws {ZodError} - If the request body is invalid or missing required fields.
     * @returns {Promise<void>}
     */
    it('should return an error if request body is invalid', async (): Promise<void> => {
      // Make the HTTP request to the post account endpoint
      const response = await chai.request(app).post('/_api/v/account/').set('Authorization', `Bearer ${token}`).send({})

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
     * Verifies that the system returns an `INTERNAL_SERVER_ERROR` response
     * when an unhandled error occurs during account creation.
     *
     * @throws {Error} - If an internal server error occurs during processing.
     * @returns {Promise<void>}
     */
    it('should return an error if an internal server error occurs', async (): Promise<void> => {
      requestBody.accountNumber = '100000000000000000'
      sandbox.stub(AccountPrismaRepository.prototype, 'create').rejects(new Error('internal server error test'))
      // Make the HTTP request to the post account endpoint
      const response = await chai.request(app).post('/_api/v/account/').set('Authorization', `Bearer ${token}`).send(requestBody)

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

  describe('GET /account/:id', (): void => {
    /**
     * Setup the Sinon sandbox before each test.
     */
    beforeEach((): void => {
      sandbox = sinon.createSandbox()
    })

    /**
     * Restore the original state of mocks after each test.
     */
    afterEach((): void => {
      sandbox.restore()
    })

    /**
     * Test for successfully retrieving account data by ID.
     *
     * Verifies that an account is found and the response contains
     * the expected status, headers, and body with valid account data.
     *
     * @returns {Promise<void>}
     */
    it('should successfully return account data by id', async (): Promise<void> => {
      // Make the HTTP request to the get account endpoint
      const response = await chai.request(app).get(`/_api/v/account/${idAccount}`).set('Authorization', `Bearer ${token}`)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(successStatusCodes.OK)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', true)
      expect(body).to.have.property('data')
      expect(body).to.have.property('message', 'ACCOUNT SUCCESSFULLY RETURNED')

      const { data } = body

      expect(data).to.have.keys(
        'id',
        'idUser',
        'name',
        'idBank',
        'idAccountType',
        'balance',
        'accountNumber',
        'createdAt',
        'updatedAt',
        'bank',
        'accountType'
      )

      expect(data.id).to.be.a('number')
      expect(data.idUser).to.be.a('number')
      expect(data.name).to.be.a('string')
      expect(data.idBank).to.be.a('number')
      expect(data.idAccountType).to.be.a('number')
      expect(data.balance).to.be.a('number')
      expect(data.accountNumber).to.be.a('string')
      expect(data.createdAt).to.be.a('string')
      expect(data.updatedAt).to.be.a('string')

      // Ensure returned dates are valid
      expect(new Date(data.createdAt)).to.be.instanceOf(Date).and.not.to.be.NaN
      expect(new Date(data.updatedAt)).to.be.instanceOf(Date).and.not.to.be.NaN

      // Verify structure of nested bank object
      expect(data.bank).to.have.all.keys('id', 'name')
      expect(data.bank.id).to.be.a('number')
      expect(data.bank.name).to.be.a('string')

      // Verify structure of nested accountType object
      expect(data.accountType).to.have.all.keys('id', 'name')
      expect(data.accountType.id).to.be.a('number')
      expect(data.accountType.name).to.be.a('string')
    })

    /**
     * Test error handling when an account is not found by ID.
     *
     * Verifies that the system returns an appropriate error response
     * when attempting to find an account that does not exist.
     *
     * @throws {HttpError} - If the account is not found.
     * @returns {Promise<void>}
     */
    it('should return an error if the account is not found', async (): Promise<void> => {
      // Make the HTTP request to the get account endpoint
      const response = await chai.request(app).get('/_api/v/account/9999999999').set('Authorization', `Bearer ${token}`)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.NOT_FOUND)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message', 'account not found')
    })

    /**
     * Test error handling for an invalid request parameter.
     *
     * Verifies that the system returns a `BAD_REQUEST` error response
     * when attempting to find an account with an invalid or empty request parameter.
     *
     * @throws {ZodError} - If the request parameter is invalid or missing required fields.
     * @returns {Promise<void>}
     */
    it('should return an error if request parameter is invalid', async (): Promise<void> => {
      // Make the HTTP request to the get account endpoint
      const response = await chai.request(app).get('/_api/v/account/a').set('Authorization', `Bearer ${token}`)

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
        expect(error).to.have.property('path')
        expect(error).to.have.property('message')
      })
    })

    /**
     * Test error handling for internal server errors.
     *
     * Verifies that the system returns an `INTERNAL_SERVER_ERROR` response
     * when an unhandled error occurs during find account.
     *
     * @throws {Error} - If an internal server error occurs during processing.
     * @returns {Promise<void>}
     */
    it('should return an error if an internal server error occurs', async (): Promise<void> => {
      sandbox.stub(AccountPrismaRepository.prototype, 'findById').rejects(new Error('internal server error test'))
      // Make the HTTP request to the get account endpoint
      const response = await chai.request(app).get(`/_api/v/account/${idAccount}`).set('Authorization', `Bearer ${token}`)

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

  describe('PUT /account/:id', (): void => {
    let requestBody: updateAccountDTO = updateAccountDTOMock
    /**
     * Setup the Sinon sandbox before each test.
     */
    beforeEach((): void => {
      sandbox = sinon.createSandbox()
      requestBody = { ...updateAccountDTOMock }
    })

    /**
     * Restore the original state of mocks after each test.
     */
    afterEach((): void => {
      sandbox.restore()
    })

    /**
     * Test for successful account update.
     *
     * Verifies that an account is updated by ID and request body,
     * and that the response contains the expected status, headers,
     * and body with updated account data.
     *
     * @returns {Promise<void>}
     */
    it('should update an account by id and request body successfully and return updated account data', async (): Promise<void> => {
      // Make the HTTP request to the put account endpoint
      requestBody.accountNumber = '000000000000000002'
      const response = await chai.request(app).put(`/_api/v/account/${idAccount}`).set('Authorization', `Bearer ${token}`).send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(successStatusCodes.OK)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', true)
      expect(body).to.have.property('data')
      expect(body).to.have.property('message', 'ACCOUNT SUCCESSFULLY UPDATED')

      const { data } = body

      expect(data).to.have.keys(
        'id',
        'idUser',
        'name',
        'idBank',
        'idAccountType',
        'balance',
        'accountNumber',
        'createdAt',
        'updatedAt',
        'bank',
        'accountType'
      )

      expect(data.id).to.be.a('number')
      expect(data.idUser).to.be.a('number')
      expect(data.name).to.be.a('string')
      expect(data.idBank).to.be.a('number')
      expect(data.idAccountType).to.be.a('number')
      expect(data.balance).to.be.a('number')
      expect(data.accountNumber).to.be.a('string')
      expect(data.createdAt).to.be.a('string')
      expect(data.updatedAt).to.be.a('string')

      // Ensure returned dates are valid
      expect(new Date(data.createdAt)).to.be.instanceOf(Date).and.not.to.be.NaN
      expect(new Date(data.updatedAt)).to.be.instanceOf(Date).and.not.to.be.NaN

      // Verify structure of nested bank object
      expect(data.bank).to.have.all.keys('id', 'name')
      expect(data.bank.id).to.be.a('number')
      expect(data.bank.name).to.be.a('string')

      // Verify structure of nested accountType object
      expect(data.accountType).to.have.all.keys('id', 'name')
      expect(data.accountType.id).to.be.a('number')
      expect(data.accountType.name).to.be.a('string')

      // Ensure updated fields match the request body
      expect(data).to.deep.include({
        name: requestBody.name,
        idBank: requestBody.idBank,
        idAccountType: requestBody.idAccountType,
        balance: requestBody.balance,
        accountNumber: requestBody.accountNumber
      })
    })

    /**
     * Test error handling when an account is not found by ID.
     *
     * Verifies that the system returns an appropriate error response
     * when attempting to update an account that does not exist.
     *
     * @throws {HttpError} - If the account is not found.
     * @returns {Promise<void>}
     */
    it('should return an error if the account is not found', async (): Promise<void> => {
      // Make the HTTP request to the put account endpoint
      const response = await chai.request(app).put('/_api/v/account/9999999999').set('Authorization', `Bearer ${token}`)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.NOT_FOUND)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message', 'account not found')
    })

    /**
     * Test error handling when an account number is already registered.
     *
     * Verifies that the system returns an appropriate error response
     * when attempting to update an account with a duplicate account number.
     *
     * @throws {HttpError} - If the account number is already registered.
     * @returns {Promise<void>}
     */
    it('should return an error if the account number is already registered', async (): Promise<void> => {
      requestBody.accountNumber = createSecundAccountMock.accountNumber
      // Make the HTTP request to the put account endpoint
      const response = await chai.request(app).put(`/_api/v/account/${idAccount}`).set('Authorization', `Bearer ${token}`).send(requestBody)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.CONFLICT)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message', 'account number is already registered')
    })

    /**
     * Test error handling for an invalid request parameter.
     *
     * Verifies that the system returns a `BAD_REQUEST` error response
     * when attempting to update an account with an invalid or empty request parameter.
     *
     * @throws {ZodError} - If the request parameter is invalid or missing required fields.
     * @returns {Promise<void>}
     */
    it('should return an error if request parameter is invalid', async (): Promise<void> => {
      // Make the HTTP request to the put account endpoint
      const response = await chai.request(app).put('/_api/v/account/a').set('Authorization', `Bearer ${token}`)

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
        expect(error).to.have.property('path')
        expect(error).to.have.property('message')
      })
    })

    /**
     * Test error handling for an invalid request body.
     *
     * Verifies that the system returns a `BAD_REQUEST` error response
     * when attempting to update an account with an invalid or empty request body.
     *
     * @throws {ZodError} - If the request body is invalid or missing required fields.
     * @returns {Promise<void>}
     */
    it('should return an error if request body is invalid', async (): Promise<void> => {
      requestBody.accountNumber = '0000'
      // Make the HTTP request to the put account endpoint
      const response = await chai.request(app).put(`/_api/v/account/${idAccount}`).set('Authorization', `Bearer ${token}`).send(requestBody)

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
        expect(error).to.have.property('path')
        expect(error).to.have.property('message')
      })
    })

    /**
     * Test error handling for internal server errors.
     *
     * Verifies that the system returns an `INTERNAL_SERVER_ERROR` response
     * when an unhandled error occurs during account updated.
     *
     * @throws {Error} - If an internal server error occurs during processing.
     * @returns {Promise<void>}
     */
    it('should return an error if an internal server error occurs', async (): Promise<void> => {
      sandbox.stub(AccountPrismaRepository.prototype, 'findById').rejects(new Error('internal server error test'))
      // Make the HTTP request to the put account endpoint
      const response = await chai.request(app).put(`/_api/v/account/${idAccount}`).set('Authorization', `Bearer ${token}`)

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

  describe('DELETE /account/:id', (): void => {
    /**
     * Setup the Sinon sandbox before each test.
     */
    beforeEach((): void => {
      sandbox = sinon.createSandbox()
    })

    /**
     * Restore the original state of mocks after each test.
     */
    afterEach((): void => {
      sandbox.restore()
    })

    /**
     * Test for the successful deletion of an account by ID.
     *
     * Verifies that an account is found and the response contains
     * the expected status, headers, and body with a valid account ID deleted.
     *
     * @returns {Promise<void>}
     */
    it('should successfully delete account by id', async (): Promise<void> => {
      // Make the HTTP request to the delete account endpoint
      const response = await chai.request(app).delete(`/_api/v/account/${idAccount}`).set('Authorization', `Bearer ${token}`)

      // Verify response headers
      expect(response.headers['content-type']).to.be.undefined
      expect(response.status).to.equal(successStatusCodes.NO_CONTENT)

      // Verify response body
      const { body } = response
      expect(body).to.deep.equal({})
    })

    /**
     * Test for the successful deletion of a second account by ID.
     *
     * Verifies that an account is found and the response contains
     * the expected status, headers, and body confirming that the
     * second account has been deleted successfully.
     *
     * @returns {Promise<void>}
     */
    it('should successfully delete second account by id', async (): Promise<void> => {
      // Make the HTTP request to the delete account endpoint
      const response = await chai.request(app).delete(`/_api/v/account/${idSecundAccount}`).set('Authorization', `Bearer ${token}`)

      // Verify response headers
      expect(response.headers['content-type']).to.be.undefined
      expect(response.status).to.equal(successStatusCodes.NO_CONTENT)

      // Verify response body
      const { body } = response
      expect(body).to.deep.equal({})
    })

    /**
     * Test error handling when an account is not found by ID.
     *
     * Verifies that the system returns an appropriate error response
     * when attempting to delete an account that does not exist.
     *
     * @throws {HttpError} - If the account is not found.
     * @returns {Promise<void>}
     */
    it('should return an error if the account is not found', async (): Promise<void> => {
      // Make the HTTP request to the delete account endpoint
      const response = await chai.request(app).delete('/_api/v/account/9999999999').set('Authorization', `Bearer ${token}`)

      // Verify response headers
      expect(response.headers['content-type']).to.include('application/json')
      expect(response.status).to.equal(clientErrorStatusCodes.NOT_FOUND)

      // Verify response body
      const { body } = response
      expect(body).to.have.property('success', false)
      expect(body).to.have.property('error')
      expect(body).to.have.property('message', 'account not found')
    })

    /**
     * Test error handling for an invalid request parameter.
     *
     * Verifies that the system returns a `BAD_REQUEST` error response
     * when attempting to delete an account with an invalid or empty request parameter.
     *
     * @throws {ZodError} - If the request parameter is invalid or missing required fields.
     * @returns {Promise<void>}
     */
    it('should return an error if request parameter is invalid', async (): Promise<void> => {
      // Make the HTTP request to the delete account endpoint
      const response = await chai.request(app).delete('/_api/v/account/a').set('Authorization', `Bearer ${token}`)

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
        expect(error).to.have.property('path')
        expect(error).to.have.property('message')
      })
    })

    /**
     * Test error handling for internal server errors.
     *
     * Verifies that the system returns an `INTERNAL_SERVER_ERROR` response
     * when an unhandled error occurs during account deleted.
     *
     * @throws {Error} - If an internal server error occurs during processing.
     * @returns {Promise<void>}
     */
    it('should return an error if an internal server error occurs', async (): Promise<void> => {
      sandbox.stub(AccountPrismaRepository.prototype, 'findById').rejects(new Error('internal server error test'))
      // Make the HTTP request to the delete account endpoint
      const response = await chai.request(app).delete(`/_api/v/account/${idAccount}`).set('Authorization', `Bearer ${token}`)

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
})
