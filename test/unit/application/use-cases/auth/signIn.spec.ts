/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import Sinon from 'sinon'

// -DTO imports
import { tokenSummary } from '@application/dtos/auth/refreshToken.dto'
import { signInDTO } from '@application/dtos/auth/signIn.dto'

// -Use Case and domain entity imports
import { SignInUseCase } from '@application/use-cases/auth/signInUseCase'
import { UserPF } from '@domain/entities/userPF.entity'

// -Repositories imports
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'

// -Services imports
import { BcryptService } from '@infrastructure/services/auth/bcrypt.service'
import { TokenService } from '@infrastructure/services/jwt/token.service'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

// -Mocks imports
import { tokenSummaryMock } from 'test/mocks/auth/tokenSummaryMock'
import { signInMock } from 'test/mocks/auth/signInMock'
import { userPFMock } from 'test/mocks/userPF/userPFMock'

describe('signIn use case', (): void => {
  let SignInUseCaseStub: SignInUseCase
  let bcryptServiceStub: Sinon.SinonStubbedInstance<BcryptService>
  let tokenServiceStub: Sinon.SinonStubbedInstance<TokenService>
  let userPFPrismaRepositoryStub: sinon.SinonStubbedInstance<UserPFPrismaRepository>

  /**
   * Mock instance of the `UserPF` entity.
   *
   * @type {UserPF}
   */
  const userInstance: UserPF = userPFMock

  /**
   * Mock STO for sign in user.
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

  /**
   * Setup before each test case.
   */
  beforeEach((): void => {
    // Create a stub for the bcryptService.
    bcryptServiceStub = Sinon.createStubInstance(BcryptService)

    // Creata a stub for the tokenService.
    tokenServiceStub = Sinon.createStubInstance(TokenService)

    // Create a stub for the UserPFPrismaRepository
    userPFPrismaRepositoryStub = Sinon.createStubInstance(UserPFPrismaRepository)

    // Instantiate the signInUseCase use case with the stubbed repository, stubbed bcrypt service and token service
    SignInUseCaseStub = new SignInUseCase(userPFPrismaRepositoryStub, bcryptServiceStub, tokenServiceStub)
  })

  /**
   * Restore original funcionality after each test case.
   */
  afterEach((): void => {
    Sinon.restore()
  })

  /**
   * Test case to verify successful user sign in
   *
   * It mocks the repository methods to simulate a find user by email.
   * It mocks the methods bcrypt service to simulate compare Password.
   * It mocks the methods of token service to simulate generation of
   * access token and generation of refresh token.
   *
   * Verifies that the returned result in signin matches to expected result of the mock tokens.
   *
   * @return {Promise<void>}
   */
  it('should successful sign in user', async (): Promise<void> => {
    userPFPrismaRepositoryStub.findByEmail.resolves(userInstance)

    bcryptServiceStub.comparePassword.resolves(true)

    tokenServiceStub.generateAccessToken.returns(tokenSummary.accessToken)
    tokenServiceStub.generateRefreshToken.returns(tokenSummary.refreshToken)

    const result: tokenSummary = await SignInUseCaseStub.execute(signInDTO)
    const expectedResult: tokenSummary = tokenSummary

    expect(result).to.deep.equal(expectedResult)
    expect(userPFPrismaRepositoryStub.findByEmail.calledOnce).to.be.true
    expect(bcryptServiceStub.comparePassword.calledOnce).to.be.true
    expect(tokenServiceStub.generateAccessToken.calledOnce).to.be.true
    expect(tokenServiceStub.generateRefreshToken.calledOnce).to.be.true
  })

  /**
   * Test case to ensure an error is thrown if the user is not found.
   *
   * It mocks the repository method to simulate an user not found and checks
   * that an HttpError with the apropriate status and message in thrown
   *
   * @return {Promise<void>}
   */
  it('should throw an error if the user is not found', async (): Promise<void> => {
    userPFPrismaRepositoryStub.findByEmail.resolves(null)

    try {
      await SignInUseCaseStub.execute(signInDTO)
      expect(userPFPrismaRepositoryStub.findByEmail.calledOnce).to.be.true
      expect.fail('Expected error not thrown')
    } catch (error: any) {
      expect(error).to.instanceOf(HttpError)
      expect((error as HttpError).status).to.be.equal(clientErrorStatusCodes.UNAUTHORIZED)
      expect((error as HttpError).message).to.be.equal('user not found')
    }
  })

  /**
   * Test case to ensures an error is thrown if the incorrect password.
   *
   * It mocks the bcrypt service methods to simulate error an incorrect password
   * and checks that an HttpError with the apropriate status and message in throw.
   *
   * @returns {Promise<void>}
   */
  it('should throw an error if the incorrect password', async (): Promise<void> => {
    userPFPrismaRepositoryStub.findByEmail.resolves(userInstance)
    bcryptServiceStub.comparePassword.resolves(false)

    try {
      await SignInUseCaseStub.execute(signInDTO)
      expect(userPFPrismaRepositoryStub.findByEmail.calledOnce).to.be.true
      expect(bcryptServiceStub.comparePassword.calledOnce).to.be.true
      expect.fail('Expected error not thrown')
    } catch (error: any) {
      expect(error).to.instanceOf(HttpError)
      expect((error as HttpError).status).to.be.equal(clientErrorStatusCodes.FORBIDDEN)
      expect((error as HttpError).message).to.be.equal('incorrect password')
    }
  })
})
