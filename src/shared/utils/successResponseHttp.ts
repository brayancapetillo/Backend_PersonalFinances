
import { successResponse, successResponseOptions } from '@shared/types/http/httpSuccess.type'
import { Response } from 'express'

export const successResponseHttp = <T>(res: Response, options: successResponseOptions<T>): void => {
  const { statusCode, message, data } = options

  const response: successResponse<T> = {
    success: true,
    data,
    message: message.toUpperCase()
  }

  res.status(statusCode).json(response)
}
