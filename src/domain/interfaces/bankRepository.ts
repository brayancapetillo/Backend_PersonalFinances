import { Bank } from '@domain/entities/bank.entity'

export interface IBankRepository {
  getBanks: () => Promise<Bank[]>
  getBankById: (id: number) => Promise<Bank | null>
}
