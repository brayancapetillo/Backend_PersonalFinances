import { refreshTokenDTO, tokenSummary } from '@application/dtos/auth/refreshToken.dto'
import { signInDTO } from '@application/dtos/auth/signIn.dto'
import { signUpDTO } from '@application/dtos/auth/signUp.dto'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'
import { RefreshTokenUseCase } from '@application/use-cases/auth/refreshTokenUseCase'
import { SignInUseCase } from '@application/use-cases/auth/signInUseCase'
import { SignUpUseCase } from '@application/use-cases/auth/signUpCaseUse'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { Request, Response } from 'express'

export class AuthController {
  constructor (
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase
  ) {}

  public async signUp (req: Request, res: Response): Promise<void> {
    try {
      const signUpDTO: signUpDTO = req.body

      const resUserPF: userSummaryDTO = await this.signUpUseCase.execute(signUpDTO)

      successResponseHttp<userSummaryDTO>(res, { statusCode: successStatusCodes.CREATED, data: resUserPF, message: 'user successfully created' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }

  public async signIn (req: Request, res: Response): Promise<void> {
    try {
      const signIn: signInDTO = req.body

      const resSignIn: tokenSummary = await this.signInUseCase.execute(signIn)

      successResponseHttp<tokenSummary>(res, { statusCode: successStatusCodes.OK, data: resSignIn, message: 'successful signin' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }

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
