import { tBank } from '@shared/types/bank.type'

export class Bank {
  constructor (
    public readonly id: number,
    public readonly name: tBank
  ) {}
}
