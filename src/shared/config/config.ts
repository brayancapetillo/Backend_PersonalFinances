import { config } from 'dotenv'
config()

export const conenv = {
  PORT: process.env.PORT ?? 3000
} as const
