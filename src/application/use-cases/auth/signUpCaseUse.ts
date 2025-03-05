/**
 * @file signUpUseCase.ts
 * @description This use case handles the user registration process.
 * It includes validation for existing email and phone number and hashes the password.
 *
 * @module UseCases/Auth
 */

// -DTO imports
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'
import { signUpDTO } from '@application/dtos/auth/signUp.dto'

// -Entity's import
import { UserPF } from '@domain/entities/userPF.entity'

// -Repositories imports
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'

// -Services imports
import { BcryptService } from '@infrastructure/services/auth/bcrypt.service'

// -Utility imports for HTTP responses and error handling
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

/**
 * SignUpUseCase class
 *
 * This class implements the logic for user registration. It validates if the
 * email or phone number already exists in the repository and hashes the user's password
 * before creating a new user.
 */
export class SignUpUseCase {
  /**
   * Constructs a SignUpUseCase instance.
   *
   * @param UserPFRepository - An instance of UserPFPrismaRepository for database operations.
   * @param bcryptService - An instance of BcryptService for password hashing.
   */
  constructor (
    private readonly UserPFRepository: UserPFPrismaRepository,
    private readonly bcryptService: BcryptService
  ) {}

  /**
   * Executes the sign-up process.
   *
   * @param signUpDTO - The data transfer object containing user registration details.
   * @returns A promise that resolves to a userSummaryDTO containing the registered user's details.
   * @throws HttpError if the email or phone number is already registered.
   */
  public async execute (signUpDTO: signUpDTO): Promise<userSummaryDTO> {
    const existEmail: UserPF | null = await this.UserPFRepository.findByEmail(signUpDTO.email)
    if (existEmail !== null) throw new HttpError(clientErrorStatusCodes.CONFLICT, 'email address is already registered')

    if (signUpDTO.phone !== null) {
      const existPhone: UserPF | null = await this.UserPFRepository.findByPhone(signUpDTO.phone)
      if (existPhone !== null) { throw new HttpError(clientErrorStatusCodes.CONFLICT, 'phone number is already registered') }
    }

    const hashedPassword: string = await this.bcryptService.hashPassword(signUpDTO.password)

    const user: UserPF = new UserPF(
      0,
      signUpDTO.email,
      signUpDTO.name,
      signUpDTO.lastName,
      signUpDTO.birthday,
      signUpDTO.phone,
      signUpDTO.idSex,
      signUpDTO.idLenguage,
      hashedPassword,
      false,
      new Date(),
      new Date()
    )

    const createdUser: UserPF = await this.UserPFRepository.create(user)

    const dataUser: userSummaryDTO = {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      lastName: createdUser.lastName,
      birthday: createdUser.birthday,
      phone: createdUser.phone,
      idSex: createdUser.idSex,
      idLenguage: createdUser.idLenguage,
      verify: createdUser.verify,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt
    }

    return dataUser
  }
}
