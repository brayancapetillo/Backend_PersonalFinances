/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import chalk from 'chalk'
import sinon from 'sinon'

// -DTO imports
import { signUpDTO } from '@application/dtos/auth/signUp.dto'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'

// -Use Case and domain entity imports
import { SignUpUseCase } from '@application/use-cases/auth/signUpCaseUse'
import { UserPF } from '@domain/entities/userPF.entity'

// -Repositories imports
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'

// -Services imports
import { BcryptService } from '@infrastructure/services/auth/bcrypt.service'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

// -Mocks imports
import { userPFMock } from 'test/mocks/userPF/userPFMock'
import { signUpMock } from 'test/mocks/auth/signUpMock'

describe(chalk.hex('#c6a363').bold('signUp use-cases tests 🧪'), () => {
  /**
   * Tests for the `signUp` use case.
   *
   * @group signUpUseCase
   */

  describe('signUp use case', (): void => {
    let signUpUseCaseStub: SignUpUseCase
    let bcryptServiceStub: sinon.SinonStubbedInstance<BcryptService>
    let userPFPrismaRepositoryStub: sinon.SinonStubbedInstance<UserPFPrismaRepository>

    /**
     * Mock DTO for registering a user.
     *
     * @type {signUpDTO}
     */
    const signUpDTO: signUpDTO = signUpMock

    /**
     * Mock instance of the `UserPF` entity.
     *
     * @type {UserPF}
     */

    const userInstance: UserPF = userPFMock

    /**
     * Setup before each test case.
     */
    beforeEach((): void => {
      // Create a stub for the BcryptService
      bcryptServiceStub = sinon.createStubInstance(BcryptService)

      // Create a stub for the UserPFPrismaRepository
      userPFPrismaRepositoryStub = sinon.createStubInstance(UserPFPrismaRepository)

      // Instantiate the SignUpUseCase use case with the stubbed repository and stubbed bcrypt service
      signUpUseCaseStub = new SignUpUseCase(userPFPrismaRepositoryStub, bcryptServiceStub)
    })

    /**
     * Restore original funcionality aftter each test case.
     */
    afterEach((): void => {
      sinon.restore()
    })

    /**
    * Test case to verify successful user sign up
    *
    * It mocks the repository methods to simulate a created user and
    * checks that the returned result matches the expected result.
    *
    * @returns {Promise<void>}
    */

    it('should sign up a user successfully', async (): Promise<void> => {
      userPFPrismaRepositoryStub.findByEmail.resolves(null)
      userPFPrismaRepositoryStub.findByPhone.resolves(null)

      userPFPrismaRepositoryStub.create.resolves(userInstance)

      const result: userSummaryDTO = await signUpUseCaseStub.execute(signUpDTO)

      const expectedResult: userSummaryDTO = {
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
      expect(userPFPrismaRepositoryStub.create.calledOnce).to.be.true
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
        await signUpUseCaseStub.execute(signUpDTO)
        expect(userPFPrismaRepositoryStub.findByEmail.calledOnce).to.be.true
        expect.fail('Expected error not thrown')
      } catch (error: any) {
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
        await signUpUseCaseStub.execute(signUpDTO)
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
