import { createAccountDTO } from '@application/dtos/account/createAccount.dto'
import { Account } from '@domain/entities/account.entity'
import { UserPF } from '@domain/entities/userPF.entity'
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

export class CreateAccountUseCase {
  constructor (
    private readonly AccountRepository: AccountPrismaRepository,
    private readonly UserPFRepository: UserPFPrismaRepository
  ) {}

  public async execute (createAccountDTO: createAccountDTO): Promise<Account> {
    const user: UserPF | null = await this.UserPFRepository.findById(createAccountDTO.idUser)
    if (user === null) throw new HttpError(clientErrorStatusCodes.UNPROCESSABLE_ENTITY, 'invalid user Id')

    const existAccount: Account | null = await this.AccountRepository.findByAccountNumber(createAccountDTO.accountNumber)
    if (existAccount !== null) throw new HttpError(clientErrorStatusCodes.CONFLICT, 'Account number is already registered')

    // !Add validation for existe bank, accountType,

    const account: Account = new Account(
      0,
      createAccountDTO.idUser,
      createAccountDTO.name,
      createAccountDTO.idBank,
      createAccountDTO.idAccountType,
      createAccountDTO.balance,
      createAccountDTO.accountNumber,
      new Date(),
      new Date()
    )

    return await this.AccountRepository.create(account)
  }
}
