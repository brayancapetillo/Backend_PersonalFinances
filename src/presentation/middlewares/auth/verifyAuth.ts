import { signInSummary } from '@application/dtos/auth/signIn.dto'
import { TokenService } from '@infrastructure/services/jwt/token.service'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'
import { NextFunction, Request, Response } from 'express'

const tokenService = new TokenService()

export const verifyAuth = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization ?? ''
  const token: string | null = authHeader.split(' ').pop() ?? null
  if (token === null) throw new HttpError(clientErrorStatusCodes.UNAUTHORIZED, 'unauthorized access')

  const decodedToken: signInSummary | null = tokenService.verifyAccessToken(token)

  if (decodedToken === null) throw new HttpError(clientErrorStatusCodes.UNAUTHORIZED, 'unauthorized access')

  req.user = decodedToken
  next()
}
