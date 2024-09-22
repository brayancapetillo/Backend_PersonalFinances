import { Account } from '@domain/entities/account.entity'
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

export class GetAccountUseCase {
  constructor (
    private readonly AccountRepository: AccountPrismaRepository
  ) {}

  public async execute (accountId: number): Promise<Account> {
    const account: Account | null = await this.AccountRepository.findById(accountId)
    if (account === null) throw new HttpError(clientErrorStatusCodes.NOT_FOUND, 'account not found')

    return account
  }
}
