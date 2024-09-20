/**
 * @file token.service.ts
 * @description Service class for handling JWT token generation and verification.
 * This class provides methods for creating access and refresh tokens, as well as
 * verifying their validity and renewing access tokens.
 *
 * @module Services/Authentication
 */

// -Library and tool imports
import jwt from 'jsonwebtoken'

// -DTO's import
import { signInSummary } from '@application/dtos/auth/signIn.dto'

// -Config's import
import { conenv } from '@shared/config/config'

/**
 * TokenService class for generating, verifying, and renewing JWT tokens.
 */
export class TokenService {
  // Secrets used for signing tokens, retrieved from conenv
  private readonly accessTokenSecret: string = conenv.ACCESS_TOKEN_SECRET
  private readonly refreshTokenSecret: string = conenv.REFRESH_TOKEN_SECRET

  /**
   * Generates a new access token.
   *
   * @param {signInSummary} payload - The payload to encode in the token.
   * @returns {string} The generated access token.
   */
  public generateAccessToken (payload: signInSummary): string {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: '15m' })
  }

  /**
   * Generates a new refresh token.
   *
   * @param {signInSummary} payload - The payload to encode in the token.
   * @returns {string} The generated refresh token.
   */
  public generateRefreshToken (payload: signInSummary): string {
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: '7d' })
  }

  /**
   * Verifies an access token and returns the decoded payload.
   *
   * @param {string} token - The access token to verify.
   * @returns {signInSummary | null} The decoded payload if valid, or null if invalid.
   */
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

  /**
   * Verifies a refresh token and returns the decoded payload.
   *
   * @param {string} token - The refresh token to verify.
   * @returns {signInSummary | null} The decoded payload if valid, or null if invalid.
   */
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

  /**
   * Renews an access token using a refresh token.
   *
   * @param {string} token - The refresh token to use for renewing the access token.
   * @returns {string | null} The new access token if successful, or null if failed.
   */
  public renewAccessToken (token: string): string | null {
    try {
      const userPayload: signInSummary | null = this.verifyRefreshToken(token)
      if (userPayload === null) throw new Error('token generation failed by renew')

      return this.generateAccessToken(userPayload)
    } catch (error) {
      return null
    }
  }
}
