import { AccountType } from '@domain/entities/accountType.entity'

export interface IAccountTypeRepository {
  getAccountsType: () => Promise<AccountType[]>
}
