/**
 * @file config.ts
 * @description This file manages the application's configuration through environment variables,
 * using the dotenv package to load variables from a specific .env file for the runtime environment.
 * @module Configuration
 */

// -Library and tool imports
import { config } from 'dotenv'

// -Type's import
import { Iconenv } from '@shared/types/env/env.type'

/**
 * NODE_ENV is used to determine the current runtime environment.
 * This value is expected to be a non-empty string.
 */
const NODE_ENV: string | undefined = process.env.NODE_ENV

// Check the NODE_ENV variable
if (typeof NODE_ENV !== 'string' || NODE_ENV.trim() === '') {
  throw new Error('NODE_ENV must be a non-empty string')
}

// Load the configuration file based on the current environment
config({
  path: `.env.${NODE_ENV}.local`
})

/**
 * Interface for the application configuration object.
 * This interface defines the properties that will be loaded from the environment variables.
 */
export const conenv: Iconenv = {
  PORT: parseInt(process.env.PORT ?? '3000'),
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS ?? ''),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? '',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? ''
} as const
