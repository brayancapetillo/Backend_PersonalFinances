import { signUpDTO } from '@application/dtos/auth/signUp.dto'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'
import { SignUpUseCase } from '@application/use-cases/auth/signUpCaseUse'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { Request, Response } from 'express'

export class AuthController {
  constructor (private readonly signUpUseCase: SignUpUseCase) {}

  public async signUp (req: Request, res: Response): Promise<void> {
    try {
      const signUpDTO: signUpDTO = req.body

      const resUserPF: userSummaryDTO = await this.signUpUseCase.execute(signUpDTO)

      successResponseHttp<userSummaryDTO>(res, { statusCode: successStatusCodes.CREATED, data: resUserPF, message: 'user successfully created' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
