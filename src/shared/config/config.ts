import { conenvI } from '@shared/types/env/env.type'
import { config } from 'dotenv'

const NODE_ENV: string | undefined = process.env.NODE_ENV

if (typeof NODE_ENV !== 'string' || NODE_ENV.trim() === '') {
  throw new Error('NODE_ENV must be a non-empty string')
}

config({
  path: `.env.${NODE_ENV}.local`
})

export const conenv: conenvI = {
  PORT: parseInt(process.env.PORT ?? '3000'),
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '12')
} as const
