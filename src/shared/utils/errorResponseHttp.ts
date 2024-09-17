import { errorResponse } from '@shared/types/http/httpError.type'
import { HttpError } from './error/httpError'
import { Response } from 'express'
import { ZodError } from 'zod'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { serverErrorStatusCodes } from '@shared/constants/http/serverStatusCode'

const createErrorResponse = (message: string, error: Error | HttpError | ZodError): errorResponse => ({
  success: false,
  message,
  error
})

const handleHttpError = (res: Response, error: HttpError): void => {
  res.status(error.status).send(createErrorResponse(error.message, error))
}

const handleZodError = (res: Response, error: ZodError): void => {
  res.status(clientErrorStatusCodes.BAD_REQUEST).send(createErrorResponse(error.message, error))
}

const handleDefaultError = (res: Response, error: Error): void => {
  res.status(serverErrorStatusCodes.INTERNAL_SERVER_ERROR).send(createErrorResponse(error.message, error))
}

const getErrorHandle = (error: Error | HttpError | ZodError): any => {
  if (error instanceof HttpError) return handleHttpError
  if (error instanceof ZodError) return handleZodError
  return handleDefaultError
}

export const errorResponseHttp = async (res: Response, error: Error | HttpError | ZodError): Promise<void> => {
  const handler = getErrorHandle(error)
  handler(res, error)
}
