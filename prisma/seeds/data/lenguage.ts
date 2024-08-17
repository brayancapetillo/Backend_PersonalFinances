import { Lenguage } from '@domain/entities/lenguage.entity'

export const dataLenguage: Array<Pick<Lenguage, 'name' | 'code'>> = [
  { name: 'Spanish', code: 'es' },
  { name: 'English', code: 'en' },
  { name: 'French', code: 'fr' }
]
