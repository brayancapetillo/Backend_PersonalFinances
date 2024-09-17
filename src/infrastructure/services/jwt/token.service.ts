import { signInSummary } from '@application/dtos/auth/signInSummary.dto'
import { conenv } from '@shared/config/config'
import jwt from 'jsonwebtoken'
export class TokenService {
  private readonly accessTokenSecret: string = conenv.ACCESS_TOKEN_SECRET
  private readonly refreshTokenSecret: string = conenv.REFRESH_TOKEN_SECRET

  public generateAccessToken (payload: signInSummary): string {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: '15m' })
  }

  public generateRefreshToken (payload: signInSummary): string {
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: '7d' })
  }

  public verifyAccessToken (token: string): signInSummary | null {
    try {
      const payload: jwt.JwtPayload | string = jwt.verify(token, this.accessTokenSecret)
      const { id, name } = payload as { id: number, name: string }
      const dataUser: signInSummary = { id, name }
      return dataUser
    } catch (error) {
      return null
    }
  }

  public verifyRefreshToken (token: string): signInSummary | null {
    try {
      const payload: jwt.JwtPayload | string = jwt.verify(token, this.refreshTokenSecret)
      const { id, name } = payload as { id: number, name: string }
      const dataUser: signInSummary = { id, name }
      return dataUser
    } catch (error) {
      return null
    }
  }
}
