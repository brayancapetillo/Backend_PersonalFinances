
import { registerUserPFDTO } from '@application/dtos/userPF/registerUserPF'
import { UserPF } from '@domain/entities/userPF.entity'
import { UserPFPrismaRepository } from '@infrastructure/database/prisma-repositories/userPF/userPFPrismaRepository'

export class RegisterUserPF {
  constructor (private readonly UserPFRepository: UserPFPrismaRepository) {}

  async execute (userPFDTO: registerUserPFDTO): Promise<UserPF> {
    const user: UserPF = new UserPF(
      0,
      userPFDTO.email,
      userPFDTO.name,
      userPFDTO.lastName ?? null,
      userPFDTO.birthday ?? null,
      userPFDTO.phone ?? null,
      userPFDTO.idSex,
      userPFDTO.idLenguage,
      userPFDTO.password,
      false,
      new Date(),
      new Date()
    )

    return await this.UserPFRepository.register(user)
  }
}
