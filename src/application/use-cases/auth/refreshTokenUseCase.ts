import { signInSummary } from '@application/dtos/auth/signIn.dto'
import { tokenSummary } from '@application/dtos/auth/tokenSummary.dto'
import { TokenService } from '@infrastructure/services/jwt/token.service'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

export class RefreshTokenUseCase {
  constructor (private readonly tokenService: TokenService) {}

  public execute (refreshToken: string): tokenSummary {
    const decodedRefreshToken: signInSummary | null = this.tokenService.verifyRefreshToken(refreshToken)

    if (decodedRefreshToken === null) throw new HttpError(clientErrorStatusCodes.UNAUTHORIZED, 'invalid refresh token')

    const newAccessToken = this.tokenService.generateAccessToken(decodedRefreshToken)
    const newRefreshToken = this.tokenService.generateRefreshToken(decodedRefreshToken)

    const newTokens: tokenSummary = { accessToken: newAccessToken, refreshToken: newRefreshToken }

    return newTokens
  }
}
