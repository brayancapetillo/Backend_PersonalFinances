import { lenguage as lenguagePrisma } from '@prisma/client'
import { tlenguageCode, tlenguageName } from '@type/lenguage.type'

export interface lenguage extends Omit<lenguagePrisma, 'name' | 'code'> {
  name: tlenguageName
  code: tlenguageCode
}

export type lenguageCreate = Pick<lenguage, 'name' | 'code'>
