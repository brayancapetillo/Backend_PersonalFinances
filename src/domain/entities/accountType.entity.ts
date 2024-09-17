import { taccountType } from '@shared/types/accountType.type'

export class AccountType {
  constructor (
    public readonly id: number,
    public name: taccountType
  ) {}
}
