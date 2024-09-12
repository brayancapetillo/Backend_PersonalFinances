/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import bcrypt from 'bcrypt'
import chalk from 'chalk'
import Sinon from 'sinon'

// -DTO imports
import { registerUserPFDTO } from '@application/dtos/userPF/registerUserPF'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'

// -Use Case and domain entity imports
import { RegisterUserPF } from '@application/use-cases/userPF/registerUserPF'
import { UserPF } from '@domain/entities/userPF.entity'

// -Repositories imports
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

/**
 * Test for the 'UserPF' use-cases.
 *
 * @group UserPF
 */
describe(chalk.hex('#c6a363').bold('userPF use-cases tests 🧪'), () => {
  /**
   * Tests for the `registerUserPF` use case.
   *
   * @group RegisterUserPF
   */
  describe('registerUserPF Use Case', (): void => {
    let registerUserPF: RegisterUserPF
    let userPFPrismaRepositoryStub: Sinon.SinonStubbedInstance<UserPFPrismaRepository>

    let bcryptStub: Sinon.SinonStub

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
     * Mock instance of the `UserPF` entity.
     *
     * @type {UserPF}
     */
    const userInstance = new UserPF(
      1,
      userPFDTO.email,
      userPFDTO.name,
      userPFDTO.lastName,
      userPFDTO.birthday,
      userPFDTO.phone,
      userPFDTO.idSex,
      userPFDTO.idLenguage,
      userPFDTO.password,
      false,
      new Date(),
      new Date()
    )

    /**
     * Setup before each test case.
     */
    beforeEach((): void => {
      // Create a stub for the UserPFPrismaRepository
      userPFPrismaRepositoryStub = Sinon.createStubInstance(UserPFPrismaRepository)
      // Instantiate the RegisterUserPF use case with the stubbed repository
      registerUserPF = new RegisterUserPF(userPFPrismaRepositoryStub)

      // Create a stub for bcrypt hash function
      bcryptStub = Sinon.stub(bcrypt, 'hash')
    })

    /**
     * Restore original funcionality aftter each test case.
     */
    afterEach((): void => {
      Sinon.restore()
    })

    /**
    * Test case to verify successful user registration
    *
    * It mocks the repository methods to simulate a successful registration and
    * checks that the returned result matches the expected result.
    *
    * @returns {Promise<void>}
    */
    it('should register a user successfully', async (): Promise<void> => {
      userPFPrismaRepositoryStub.findByEmail.resolves(null)
      userPFPrismaRepositoryStub.findByPhone.resolves(null)
      bcryptStub.resolves('hashedPassword')

      userPFPrismaRepositoryStub.register.resolves(userInstance)
      const result: userSummaryDTO = await registerUserPF.execute(userPFDTO)

      const expectedResult = {
        id: userInstance.id,
        email: userInstance.email,
        name: userInstance.name,
        lastName: userInstance.lastName,
        birthday: userInstance.birthday,
        phone: userInstance.phone,
        idSex: userInstance.idSex,
        idLenguage: userInstance.idLenguage,
        verify: userInstance.verify,
        createdAt: userInstance.createdAt,
        updatedAt: userInstance.updatedAt
      }

      expect(result).to.deep.equal(expectedResult)
      expect(userPFPrismaRepositoryStub.register.calledOnce).to.be.true
      expect(userPFPrismaRepositoryStub.findByEmail.calledOnce).to.be.true
      expect(userPFPrismaRepositoryStub.findByPhone.calledOnce).to.be.true
    })

    /**
     * Test case to ensure an error is thrown if the email is already registered.
     *
     * It mocks the repository method to simulate an existing user by email and
     * checks that an HttpError with the appropriate status and message is thrown.
     *
     * @returns {Promise<void>}
     */
    it('should throw an error if the email is already registered', async (): Promise<void> => {
      userPFPrismaRepositoryStub.findByEmail.resolves(userInstance)

      try {
        await registerUserPF.execute(userPFDTO)
        expect(userPFPrismaRepositoryStub.findByEmail.calledOnce).to.be.true
        expect.fail('Expected error not thrown')
      } catch (error) {
        expect(error).to.be.instanceOf(HttpError)
        expect((error as HttpError).status).to.equal(clientErrorStatusCodes.CONFLICT)
        expect((error as HttpError).message).to.equal('email address is already registered')
      }
    })

    /**
     * Test case to ensure an error is thrown if the number phone is already registered.
     *
     * It mocks the repository method tto simulate an existing user by number phone and
     * checks that an HttpError with the appropriate status and message is thrown.
     *
     * @returns {Promise<void>}
     */
    it('should throw an error if the phone number is already registered', async (): Promise<void> => {
      userPFPrismaRepositoryStub.findByEmail.resolves(null)
      userPFPrismaRepositoryStub.findByPhone.resolves(userInstance)
      try {
        await registerUserPF.execute(userPFDTO)
        expect(userPFPrismaRepositoryStub.findByPhone.calledOnce).to.be.true
        expect.fail('Expected error not thrown')
      } catch (error) {
        expect(error).to.be.instanceOf(HttpError)
        expect((error as HttpError).status).to.be.equal(clientErrorStatusCodes.CONFLICT)
        expect((error as HttpError).message).to.equal('phone number is already registered')
      }
    })
  })
})
