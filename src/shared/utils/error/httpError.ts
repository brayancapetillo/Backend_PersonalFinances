import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { serverErrorStatusCodes } from '@shared/constants/http/serverStatusCode'

export class HttpError extends Error {
  public readonly status: clientErrorStatusCodes | serverErrorStatusCodes

  constructor (status: clientErrorStatusCodes | serverErrorStatusCodes, message: string) {
    super(message)
    this.status = status
    this.name = 'HttpError'
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
