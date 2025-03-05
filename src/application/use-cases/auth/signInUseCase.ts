/**
 * @file signInUseCase.ts
 * @description This use case handles the user sign-in process, validating the user's credentials
 * and generating access and refresh tokens upon successful authentication.
 *
 * @module UseCases/Auth
 */

// -DTO imports
import { tokenSummary } from '@application/dtos/auth/refreshToken.dto'
import { signInDTO } from '@application/dtos/auth/signIn.dto'

// -Entity's import
import { UserPF } from '@domain/entities/userPF.entity'

// -Repositories imports
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'

// -Services imports
import { BcryptService } from '@infrastructure/services/auth/bcrypt.service'
import { TokenService } from '@infrastructure/services/jwt/token.service'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

/**
 * SignInUseCase class
 *
 * This class implements the logic for user sign-in. It validates the provided email and password,
 * and generates access and refresh tokens if the credentials are valid.
 */
export class SignInUseCase {
  /**
   * Constructs a SignInUseCase instance.
   *
   * @param UserPFRepository - An instance of UserPFPrismaRepository for database operations.
   * @param bcryptService - An instance of BcryptService for password comparison.
   * @param tokenService - An instance of TokenService for token generation.
   */
  constructor (
    private readonly UserPFRepository: UserPFPrismaRepository,
    private readonly bcryptService: BcryptService,
    private readonly tokenService: TokenService
  ) {}

  /**
   * Executes the sign-in process.
   *
   * @param signInDTO - The data transfer object containing the user's sign-in credentials.
   * @returns A promise that resolves to a tokenSummary containing the access and refresh tokens.
   * @throws HttpError if the user is not found or if the password is incorrect.
   */
  public async execute (signInDTO: signInDTO): Promise<tokenSummary> {
    const user: UserPF | null = await this.UserPFRepository.findByEmail(signInDTO.email)
    if (user === null) throw new HttpError(clientErrorStatusCodes.FORBIDDEN, 'user not found')

    const isValidPassword: boolean = await this.bcryptService.comparePassword(signInDTO.password, user.password)
    if (!isValidPassword) throw new HttpError(clientErrorStatusCodes.FORBIDDEN, 'incorrect password')

    const accessToken: string = this.tokenService.generateAccessToken({ id: user.id, name: user.name })
    const refreshToken: string = this.tokenService.generateRefreshToken({ id: user.id, name: user.name })

    const tokens: tokenSummary = { accessToken, refreshToken }

    return tokens
  }
}
