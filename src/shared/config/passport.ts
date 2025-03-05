import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithoutRequest } from 'passport-jwt'
import { conenv } from '@shared/config/config'

const opts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: conenv.ACCESS_TOKEN_SECRET
}

export const jwtStrategy = new JwtStrategy(opts, async (token, done) => {
  try {
    if (token !== '') {
      return done(null, token)
    }
    return done(null, false)
  } catch (error) {
    return done(error, false)
  }
})
