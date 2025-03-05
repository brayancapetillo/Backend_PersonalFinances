/**
 * @file refreshTokenValidation.ts
 * @description Validation schema for refresh token requests. This schema ensures that
 * the required fields are present and properly formatted during the refresh token process.
 *
 * @module Validators/Auth
 */

// -Zod schema import
import { z } from 'zod'

/**
 * Zod validation schema for refresh token data.
 *
 * This schema validates the following field:
 * - `refreshToken`: Must be a non-empty string, indicating the refresh token to be validated.
 */
export const refreshTokenSchema = z.object({
  refreshToken: z.string({ required_error: 'refreshToken is required', invalid_type_error: 'refreshToken must be string' }).nonempty('refreshToken cannot be empty')
})
