import { Account } from '@domain/entities/account.entity'

export type createAccountDTO = Omit<Account, 'id' | 'createdAt' | 'updatedAt'>
