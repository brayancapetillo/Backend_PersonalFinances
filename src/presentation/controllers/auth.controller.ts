/**
 * @file auth.controller.ts
 * @description Controller for handling authentication-related operations such as user sign-Up,
 * sing-In, and token refresh. This controller interacts with to respective use cases to perform
 * the necessary business logic and send responses to the client.
 *
 * @module Controller/Auth
 */

// -Library and tool imports
import { Request, Response } from 'express'

// -DTO import
import { refreshTokenDTO, tokenSummary } from '@application/dtos/auth/refreshToken.dto'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'
import { signInDTO } from '@application/dtos/auth/signIn.dto'
import { signUpDTO } from '@application/dtos/auth/signUp.dto'

// -Use Case's import
import { RefreshTokenUseCase } from '@application/use-cases/auth/refreshTokenUseCase'
import { SignInUseCase } from '@application/use-cases/auth/signInUseCase'
import { SignUpUseCase } from '@application/use-cases/auth/signUpCaseUse'

// -Utility imports for HTTP responses and error handling
import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'

/**
 * AuthController class handles the authentication processes.
 * It contains methods for user registration, login, and refreshing tokens.
 */
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @param signUpUseCase - Use case for handling user sign-up.
   * @param signInUseCase - Use case for handling user sign-in.
   * @param refreshTokenUseCase - Use case for handling refresh token operations.
   */
  constructor (
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase
  ) {}

  /**
   * Handles user sign-up requests.
   * @param req - The HTTP request object containing the user sign-up data.
   * @param res - The HTTP response object to send the result.
   */
  public async signUp (req: Request, res: Response): Promise<void> {
    try {
      const signUpDTO: signUpDTO = req.body

      const resUserPF: userSummaryDTO = await this.signUpUseCase.execute(signUpDTO)

      successResponseHttp<userSummaryDTO>(res, { statusCode: successStatusCodes.CREATED, data: resUserPF, message: 'user successfully created' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }

  /**
   * Handles user sign-in requests.
   * @param req - The HTTP request object containing the user sign-in data.
   * @param res - The HTTP response object to send the result.
   */
  public async signIn (req: Request, res: Response): Promise<void> {
    try {
      const signIn: signInDTO = req.body

      const resSignIn: tokenSummary = await this.signInUseCase.execute(signIn)

      successResponseHttp<tokenSummary>(res, { statusCode: successStatusCodes.OK, data: resSignIn, message: 'successful signin' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }

  /**
   * Handles token refresh requests.
   * @param req - The HTTP request object containing the refresh token.
   * @param res - The HTTP response object to send the result.
   */
  public async refreshToken (req: Request, res: Response): Promise<void> {
    try {
      const refreshToken: refreshTokenDTO = req.body

      const resRefreshToken: tokenSummary = this.refreshTokenUseCase.execute(refreshToken)

      successResponseHttp<tokenSummary>(res, { statusCode: successStatusCodes.OK, data: resRefreshToken, message: 'token successfully refresh' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
