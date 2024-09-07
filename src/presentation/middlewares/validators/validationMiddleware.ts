import { errorResponseHttp } from '@shared/utils/errorResponseHttp'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ZodSchema } from 'zod'

export const validateSchema = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error: any) {
      void errorResponseHttp(res, error)
    }
  }
}
