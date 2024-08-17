import { tBank } from '@shared/types/bank.type'

export class Bank {
  public readonly id: number
  public readonly name: tBank

  constructor (id: number, name: tBank) {
    this.id = id
    this.name = name
  }
}
