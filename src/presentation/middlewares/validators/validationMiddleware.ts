/**
 * @file validationMiddleware.ts
 * @description Middleware for validating request bodies against a provided Zod schema.
 * If the validation fails, an error response is sent to the client.
 * @module Middleware/Validation
 */

// -Utility's import
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'

// -Express import
import { NextFunction, Request, RequestHandler, Response } from 'express'

// -Zod schema import
import { ZodSchema } from 'zod'

/**
 * Middleware for validating the request body using a Zod schema.
 * If the validation passes, the request proceeds to the next middleware or route handler.
 * If the validation fails, an error response is returned using `errorResponseHttp`.
 *
 * @param {ZodSchema} schema - The Zod schema used to validate the request body.
 * @returns {RequestHandler} - An Express request handler that validates the request body.
 *
 * @example
 * const schema = z.object({
 *   username: z.string(),
 *   password: z.string().min(8)
 * })
 *
 * app.post('/signIn', validateSchema(schema), (req, res) => {
 *   res.send('signIn successful')
 * })
 */
export const validateSchema = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body using the provided schema
      schema.parse(req.body)
      next()
    } catch (error: any) {
      // Handle validation errors and send a response
      void errorResponseHttp(res, error)
    }
  }
}
