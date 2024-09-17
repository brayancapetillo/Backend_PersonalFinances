import { tlenguageCode, tlenguageName } from '@shared/types/lenguage.type'

export class Lenguage {
  public readonly id: number
  public code: tlenguageCode
  public name: tlenguageName

  constructor (id: number, code: tlenguageCode, name: tlenguageName) {
    this.id = id
    this.code = code
    this.name = name
  }
}
