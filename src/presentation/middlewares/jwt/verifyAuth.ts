import { signInSummary } from '@application/dtos/auth/signIn.dto'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { serverErrorStatusCodes } from '@shared/constants/http/serverStatusCode'
import { HttpError } from '@shared/utils/error/httpError'
import { errorResponseHttp } from '@shared/utils/errorResponseHttp'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

export const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: signInSummary | false): void => {
    if (err !== null) {
      void errorResponseHttp(res, new HttpError(serverErrorStatusCodes.INTERNAL_SERVER_ERROR, 'error authenticate token')); return
    }

    if (user === false) {
      void errorResponseHttp(res, new HttpError(clientErrorStatusCodes.UNAUTHORIZED, 'invalid token')); return
    }

    const dataUser: signInSummary = { id: user.id, name: user.name }
    req.user = dataUser

    next()
  })(req, res, next)
}
