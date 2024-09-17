import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { serverErrorStatusCodes } from '@shared/constants/http/serverStatusCode'

export interface errorResponseOptions {
  statusCode: clientErrorStatusCodes | serverErrorStatusCodes
  message: string
  error: string | object | unknown

}

export interface errorResponse {
  success: boolean
  message: string
  error: string | object | unknown
}
