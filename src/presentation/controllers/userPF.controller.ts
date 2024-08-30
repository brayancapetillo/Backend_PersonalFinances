import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { RegisterUserPF } from '@application/use-cases/userPF/registerUserPF'
import { registerUserPFDTO } from '@application/dtos/userPF/registerUserPF'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { Request, Response } from 'express'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'

export class UserPFController {
  constructor (private readonly registerUserPF: RegisterUserPF) {}

  async register (req: Request, res: Response): Promise<void> {
    try {
      const userPFDTO: registerUserPFDTO = req.body

      const resUserPF: userSummaryDTO = await this.registerUserPF.execute(userPFDTO)

      successResponseHttp<userSummaryDTO>(res, { statusCode: successStatusCodes.CREATED, data: resUserPF, message: 'user successfully created' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
