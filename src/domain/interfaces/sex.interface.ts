import { sex as sexPrisma } from '@prisma/client'
import { typeSex } from '@type/sex.type'

export interface sex extends Omit<sexPrisma, 'name'> {
  name: typeSex
}
