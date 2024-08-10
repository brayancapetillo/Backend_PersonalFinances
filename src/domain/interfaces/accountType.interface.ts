import { accountType as accountTypePrisma } from '@prisma/client'
import { taccountType } from '@type/accountType.type'

export interface accountType extends Omit<accountTypePrisma, 'name'> {
  name: taccountType
}
