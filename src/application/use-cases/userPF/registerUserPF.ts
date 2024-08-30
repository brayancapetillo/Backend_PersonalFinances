
import { registerUserPFDTO } from '@application/dtos/userPF/registerUserPF'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'
import { UserPF } from '@domain/entities/userPF.entity'
import { UserPFPrismaRepository } from '@infrastructure/database/prisma-repositories/userPF/userPFPrismaRepository'
import { conenv } from '@shared/config/config'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'
import bcrypt from 'bcrypt'

export class RegisterUserPF {
  constructor (private readonly UserPFRepository: UserPFPrismaRepository) { }

  async execute (userPFDTO: registerUserPFDTO): Promise<userSummaryDTO> {
    const isEmail: UserPF | null = await this.UserPFRepository.findByEmail(userPFDTO.email)
    if (isEmail !== null) { throw new HttpError(clientErrorStatusCodes.CONFLICT, 'email address is already registered') }

    if (userPFDTO.phone !== null) {
      const isPhone: UserPF | null = await this.UserPFRepository.findByPhone(userPFDTO.phone)
      if (isPhone !== null) { throw new HttpError(clientErrorStatusCodes.CONFLICT, 'phone number is already registered') }
    }

    const hashedPassword: string = await bcrypt.hash(userPFDTO.password, conenv.BCRYPT_SALT_ROUNDS)

    const user: UserPF = new UserPF(
      0,
      userPFDTO.email,
      userPFDTO.name,
      userPFDTO.lastName ?? null,
      userPFDTO.birthday ?? null,
      userPFDTO.phone ?? null,
      userPFDTO.idSex,
      userPFDTO.idLenguage,
      hashedPassword,
      false,
      new Date(),
      new Date()
    )

    const createdUser: UserPF = await this.UserPFRepository.register(user)

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
