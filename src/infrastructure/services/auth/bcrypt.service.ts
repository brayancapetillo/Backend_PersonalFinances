/**
 * @file bcrypt.service.ts
 * @description Service class for handling password hashing and comparison using bcrypt.
 * This class provides methods for securely hashing passwords and comparing plain text
 * passwords with their hashed versions.
 *
 * @module Services/Authentication
 */

// -Library and tool imports
import bcrypt from 'bcrypt'

// -Config's import
import { conenv } from '@shared/config/config'

/**
 * BcryptService class for hashing and comparing passwords.
 */
export class BcryptService {
  // Number of salt rounds used for hashing passwords, retrieved from conenv
  private readonly salt: number = conenv.BCRYPT_SALT_ROUNDS

  /**
   * Hashes a plain text password.
   *
   * @param {string} password - The plain text password to hash.
   * @returns {Promise<string>} The hashed password.
   */
  public async hashPassword (password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt)
  }

  /**
   * Compares a plain text password with a hashed password.
   *
   * @param {string} password - The plain text password to compare.
   * @param {string} hashedPassword - The hashed password to compare against.
   * @returns {Promise<boolean>} True if the passwords match, false otherwise.
   */
  public async comparePassword (password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
