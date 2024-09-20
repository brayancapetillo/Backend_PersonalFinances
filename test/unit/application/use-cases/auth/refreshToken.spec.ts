/* eslint-disable @typescript-eslint/no-unused-expressions */
// -Library and tool imports
import { expect } from 'chai'
import Sinon from 'sinon'

// -DTO imports
import { refreshTokenDTO, tokenSummary } from '@application/dtos/auth/refreshToken.dto'
import { signInSummary } from '@application/dtos/auth/signIn.dto'

// -Use Case and domain entity imports
import { RefreshTokenUseCase } from '@application/use-cases/auth/refreshTokenUseCase'

// -Services imports
import { TokenService } from '@infrastructure/services/jwt/token.service'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

// -Mocks imports
import { tokenRefreshMock, tokenSummaryMock } from 'test/mocks/auth/tokenSummaryMock'
import { userSummaryMock } from 'test/mocks/userPF/userSummaryMock'

describe('refreshToken use case', (): void => {
  let refreshTokenUseCaseStub: RefreshTokenUseCase
  let tokenServiceStub: Sinon.SinonStubbedInstance<TokenService>
  /**
   * Mock DTO for tokenSummary
   *
   * @type {tokenSummary}
   */
  const tokenSummary: tokenSummary = tokenSummaryMock

  /**
   * Mock DTO for refresh token
   *
   * @type {refreshTokenDTO}
   */
  let refreshTokenDTO: refreshTokenDTO = tokenRefreshMock

  /**
   * Mock DTO for user summary.
   *
   * @type {signInSummary}
   */
  const signInSummary: signInSummary = { id: userSummaryMock.id, name: userSummaryMock.name }

  /**
   * Setup before each test case.
   */
  beforeEach((): void => {
    // Create TokenService
    tokenServiceStub = Sinon.createStubInstance(TokenService)

    // Instantiate the RefreshTokenUseCase use case with the stubbed token service
    refreshTokenUseCaseStub = new RefreshTokenUseCase(tokenServiceStub)

    refreshTokenDTO = { ...tokenRefreshMock }
  })

  /**
   * Restore original funcionality after each test case.
   */
  afterEach((): void => {
    Sinon.restore()
  })

  /**
   * Test case to verify successful refresh tokens.
   *
   * It mocks the methods of token service to simulate generation of
   * access token and generation of refresh token.
   *
   * Verifies that the returned result in refreshToken matches to expected result of the mock tokens.
   *
   * @return {Promise<void>}
   */
  it('should successful refreshed tokens', async (): Promise<void> => {
    tokenServiceStub.generateAccessToken.returns(tokenSummary.accessToken)
    tokenServiceStub.generateRefreshToken.returns(tokenSummary.refreshToken)
    tokenServiceStub.verifyRefreshToken.returns(signInSummary)

    const result: tokenSummary = refreshTokenUseCaseStub.execute(refreshTokenDTO)
    const expectedResult: tokenSummary = tokenSummary

    expect(result).to.deep.equal(expectedResult)
    expect(tokenServiceStub.generateAccessToken.calledOnce).to.be.true
    expect(tokenServiceStub.generateRefreshToken.calledOnce).to.be.true
  })

  /**
   * test case to ensures an error is thrown if the refresh token invalid.
   *
   * Its mocks the token service methods to simulate error an invalid token refresh
   * and checks that an HttpError with the apropriate status and message in throw.
   *
   * @returns {Promise<void>}
   */
  it('should throw an error if the invalid refresh token', async (): Promise<void> => {
    tokenServiceStub.verifyRefreshToken.returns(null)

    try {
      refreshTokenUseCaseStub.execute(refreshTokenDTO)
      expect(tokenServiceStub.verifyRefreshToken.calledOnce).to.be.true
      expect.fail('expected error not thrown')
    } catch (error: any) {
      expect(error).to.be.instanceOf(HttpError)
      expect((error as HttpError).status).to.be.equal(clientErrorStatusCodes.UNAUTHORIZED)
      expect((error as HttpError).message).to.be.equal('invalid refresh token')
    }
  })
})
