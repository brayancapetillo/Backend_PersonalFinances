import { createAccountDTO } from '@application/dtos/account/createAccount.dto'
import { CreateAccountUseCase } from '@application/use-cases/account/createAccountUseCase'
import { Account } from '@domain/entities/account.entity'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { Request, Response } from 'express'

export class AccountController {
  constructor (
    private readonly createAccountUseCase: CreateAccountUseCase
  ) {}

  public async createAccount (req: Request, res: Response): Promise<void> {
    try {
      const createAccountDTO: createAccountDTO = req.body

      const resCreateAccount: Account = await this.createAccountUseCase.execute(createAccountDTO)

      successResponseHttp<Account>(res, { statusCode: successStatusCodes.OK, data: resCreateAccount, message: 'account successfully created' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
