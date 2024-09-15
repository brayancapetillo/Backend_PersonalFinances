import { signUpDTO } from '@application/dtos/auth/signUp.dto'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'
import { UserPF } from '@domain/entities/userPF.entity'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'
import { BcryptService } from '@infrastructure/services/auth/bcrypt.service'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

export class SignUpUseCase {
  constructor (
    private readonly UserPFRepository: UserPFPrismaRepository,
    private readonly bcryptService: BcryptService
  ) {}

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
