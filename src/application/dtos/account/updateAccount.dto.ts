import { Account } from '@domain/entities/account.entity'

export type updateAccountDTO = Partial<Pick<Account, 'name' | 'idBank' | 'idAccountType' | 'balance' | 'accountNumber' | 'updatedAt'>>
