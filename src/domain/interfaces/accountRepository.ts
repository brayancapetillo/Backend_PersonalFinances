import { Account } from '@domain/entities/account.entity'

export interface IAccountRepository {
  findById: (id: number) => Promise<Account | null>
  findByAccountNumber: (accountNumber: string) => Promise<Account | null>
  findAllByUserId: (userId: number) => Promise<Account[]>
  update: (account: Account) => Promise<Account>
  create: (account: Account) => Promise<Account>
  delete: (id: number) => Promise<void>
}
