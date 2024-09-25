import { createAccountDTO } from '@application/dtos/account/createAccount.dto'
import { updateAccountDTO } from '@application/dtos/account/updateAccount.dto'
import { CreateAccountUseCase } from '@application/use-cases/account/createAccountUseCase'
import { DeleteAccountUseCase } from '@application/use-cases/account/DeleteAccountUseCase'
import { GetAccountUseCase } from '@application/use-cases/account/getAccountUseCase'
import { UpdateAccountUseCase } from '@application/use-cases/account/updateAccountUseCase'
import { Account } from '@domain/entities/account.entity'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'
import { successResponseHttp } from '@shared/utils/successResponseHttp'
import { Request, Response } from 'express'

export class AccountController {
  constructor (
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly getAccountUseCase: GetAccountUseCase,
    private readonly updateAccountUseCase: UpdateAccountUseCase,
    private readonly deleteAccountUseCase: DeleteAccountUseCase
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

  public async getAccount (req: Request, res: Response): Promise<void> {
    try {
      const accountId: number = Number(req.params.id)

      const resGetAccount: Account = await this.getAccountUseCase.execute(accountId)

      successResponseHttp<Account>(res, { statusCode: successStatusCodes.OK, data: resGetAccount, message: 'account successfully returned' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }

  public async updateAccount (req: Request, res: Response): Promise<void> {
    try {
      const accountId: number = Number(req.params.id)
      const updateAccountDTO: updateAccountDTO = req.body

      const resUpdateAccount: Account = await this.updateAccountUseCase.execute(accountId, updateAccountDTO)

      successResponseHttp<Account>(res, { statusCode: successStatusCodes.OK, data: resUpdateAccount, message: 'account successfully updated' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }

  public async deleteAccount (req: Request, res: Response): Promise<void> {
    try {
      const accountId: number = Number(req.params.id)

      await this.deleteAccountUseCase.execute(accountId)
      successResponseHttp<number>(res, { statusCode: successStatusCodes.NO_CONTENT, data: accountId, message: 'account successfully deleted' })
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
