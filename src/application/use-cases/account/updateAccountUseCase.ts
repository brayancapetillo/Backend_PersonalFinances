import { updateAccountDTO } from '@application/dtos/account/updateAccount.dto'
import { Account } from '@domain/entities/account.entity'
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

export class UpdateAccountUseCase {
  constructor (private readonly AccountRepository: AccountPrismaRepository) {}

  public async execute (accountId: number, updateAccountDTO: updateAccountDTO): Promise<Account> {
    const account: Account | null = await this.AccountRepository.findById(accountId)
    if (account === null) throw new HttpError(clientErrorStatusCodes.NOT_FOUND, 'account not found')

    if (updateAccountDTO.accountNumber !== undefined) {
      const existAccountNumber: Account | null = await this.AccountRepository.findByAccountNumber(updateAccountDTO.accountNumber)
      if (existAccountNumber !== null && existAccountNumber.id !== accountId) throw new HttpError(clientErrorStatusCodes.CONFLICT, 'Account number is already registered')
    }

    const dataUpdateAccount: updateAccountDTO = {
      name: updateAccountDTO.name ?? account.name,
      idBank: updateAccountDTO.idBank ?? account.idBank,
      idAccountType: updateAccountDTO.idAccountType ?? account.idAccountType,
      balance: updateAccountDTO.balance ?? account.balance,
      accountNumber: updateAccountDTO.accountNumber ?? account.accountNumber,
      updatedAt: new Date()
    }

    const updateAccount: Account = await this.AccountRepository.update(account.id, dataUpdateAccount)

    return updateAccount
  }
}
