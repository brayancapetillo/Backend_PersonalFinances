import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { RegisterUserPF } from '@application/use-cases/userPF/registerUserPF'
import { registerUserPFDTO } from '@application/dtos/userPF/registerUserPF'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { UserPF } from '@domain/entities/userPF.entity'
import { Request, Response } from 'express'

export class UserPFController {
  constructor (private readonly registerUserPF: RegisterUserPF) {}

  async register (req: Request, res: Response): Promise<void> {
    try {
      const userPFDTO: registerUserPFDTO = req.body

      const resUserPF: UserPF = await this.registerUserPF.execute(userPFDTO)

      successResponseHttp<UserPF>(res, { statusCode: successStatusCodes.CREATED, data: resUserPF, message: 'user successfully created' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
