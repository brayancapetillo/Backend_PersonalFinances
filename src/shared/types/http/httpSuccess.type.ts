import { informationalStatusCodes } from '@shared/constants/http/InformationalStatusCode'
import { redirectionStatusCodes } from '@shared/constants/http/redirectionStatusCode'
import { successStatusCodes } from '@shared/constants/http/successStatusCode'

export interface successResponseOptions<T> {
  statusCode: informationalStatusCodes | redirectionStatusCodes | successStatusCodes
  message: string
  data: T | T[] | string
}

export interface successResponse<T> {
  success: boolean
  message: string
  data: T | T[] | string
}
