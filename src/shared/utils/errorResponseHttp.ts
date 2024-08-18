import { errorResponse } from '@shared/types/http/httpError.type'
import { HttpError } from './error/httpError'
import { Response } from 'express'
import { serverErrorStatusCodes } from '@shared/constants/http/serverStatusCode'

export const errorResponseHttp = async (res: Response, error: Error | HttpError): Promise<void> => {
  if (error instanceof HttpError) {
    const response: errorResponse = {
      success: false,
      message: error.message,
      error: error.stack
    }

    res.status(error.status).json(response)
  } else {
    const response: errorResponse = {
      success: false,
      message: error.message,
      error: error.stack
    }

    res.status(serverErrorStatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
