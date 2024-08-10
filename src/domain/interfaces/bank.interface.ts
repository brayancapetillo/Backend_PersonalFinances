import { bank as bankPrisma } from '@prisma/client'
import { typeBank } from '@type/bank.type'

export interface bank extends Omit<bankPrisma, 'name'> {
  name: typeBank
}
