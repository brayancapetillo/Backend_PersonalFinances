import { Sex } from '@domain/entities/sex.entity'
import { tSex } from '@shared/types/sex.type'

interface seedSex extends Pick<Sex, 'name'> {
  name: tSex
}

export const dataSex: seedSex[] = [
  { name: 'none' },
  { name: 'Male' },
  { name: 'Female' }
]
