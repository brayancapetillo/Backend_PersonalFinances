import { Account } from './account.entity'
import { Category } from './category.entity'

export class TransactionPF {
  constructor (
    public readonly id: number,
    public idCategory: number,
    public idAccount: number,
    public amount: number,
    public transactionDate: Date,
    public idTransactionType: number,
    public thirdParties: boolean,
    public description: string,
    public createdAt: Date,
    public category?: Category,
    public account?: Account
  ) {}
}
