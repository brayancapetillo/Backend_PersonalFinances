import { signInSummary } from '@application/dtos/auth/tokenSummary.dto'

declare global {
  namespace Express {
    interface Request {
      user?: signInSummary
    }
  }
}
