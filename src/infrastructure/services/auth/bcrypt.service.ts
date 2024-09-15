import bcrypt from 'bcrypt'
import { conenv } from '@shared/config/config'

export class BcryptService {
  private readonly salt: number = conenv.BCRYPT_SALT_ROUNDS

  public async hashPassword (password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt)
  }

  public async comparePassword (password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
