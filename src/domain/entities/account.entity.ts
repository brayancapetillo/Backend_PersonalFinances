import { AccountType } from '@domain/entities/accountType.entity'
import { Bank } from './bank.entity'

export class Account {
  constructor (
    public readonly id: number,
    public idUser: number,
    public name: string,
    public idBank: number,
    public idAccountType: number,
    public balance: number,
    public accountNumber: string,
    public createdAt: Date,
    public updatedAt: Date,
    public creditUsed?: number,
    public creditLimit?: number,
    public cutOffDate?: Date,
    public paymentDueDate?: Date,
    public bank?: Bank,
    public accountType?: AccountType
  ) {}
}
