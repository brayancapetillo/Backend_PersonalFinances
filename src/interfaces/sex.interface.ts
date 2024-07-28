// import { tSex } from 'src/types/sex.type'

import { sex as sexPrisma } from '@prisma/client'
import { tsex } from '@type/sex.type'

export interface sex extends Omit<sexPrisma, 'name'> {
  name: tsex
}

export interface sexCreate extends Pick<sex, 'name'> {}
