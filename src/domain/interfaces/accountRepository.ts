import { updateAccountDTO } from '@application/dtos/account/updateAccount.dto'
import { Account } from '@domain/entities/account.entity'

export interface IAccountRepository {
  findById: (id: number) => Promise<Account | null>
  findByAccountNumber: (accountNumber: string) => Promise<Account | null>
  findAllByUserId: (userId: number) => Promise<Account[]>
  update: (id: number, account: updateAccountDTO) => Promise<Account>
  create: (account: Account) => Promise<Account>
  delete: (id: number) => Promise<void>
}
