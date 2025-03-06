import { Bank } from '@domain/entities/bank.entity'

export interface IBankRepository {
  getBanks: () => Promise<Bank[]>
}
