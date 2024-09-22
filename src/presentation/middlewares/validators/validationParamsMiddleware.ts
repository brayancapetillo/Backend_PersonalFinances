import { errorResponseHttp } from '@shared/utils/errorResponseHttp'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ZodSchema } from 'zod'

export const validateParamsSchema = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request params using the provided schema
      schema.parse(req.params)
      next()
    } catch (error: any) {
      // Handle validation errors and send a response
      void errorResponseHttp(res, error)
    }
  }
}
