import { UserPF } from '@domain/entities/userPF.entity'
import { UserPFRepository } from '@domain/interfaces/UserPFRepository'

import prisma from '@infrastructure/database/prismaClient'
import { userPF as prismaUserPF } from '@prisma/client'

export class UserPFPrismaRepository implements UserPFRepository {
  async findById (id: number): Promise<UserPF | null> {
    const user: prismaUserPF | null = await prisma.userPF.findUnique({ where: { id } })
    return user !== null ? this.toDomain(user) : null
  }

  async findByEmail (email: string): Promise<UserPF | null> {
    const user: prismaUserPF | null = await prisma.userPF.findUnique({ where: { email } })
    return user !== null ? this.toDomain(user) : null
  }

  async findByPhone (phone: string): Promise<UserPF | null> {
    const user: prismaUserPF | null = await prisma.userPF.findFirst({ where: { phone } })
    return user !== null ? this.toDomain(user) : null
  }

  async register (user: UserPF): Promise<UserPF> {
    const savedUser: prismaUserPF = await prisma.userPF.create(
      {
        data:
                {
                  email: user.email,
                  name: user.name,
                  lastName: user.lastName,
                  birthday: user.birthday,
                  phone: user.phone,
                  idSex: user.idSex,
                  idLenguage: user.idLenguage,
                  password: user.password,
                  verify: user.verify,
                  createdAt: user.createdAt,
                  updatedAt: user.updatedAt
                }
      }
    )

    return this.toDomain(savedUser)
  }

  private toDomain (prismaUserPF: prismaUserPF): UserPF {
    return new UserPF(
      prismaUserPF.id,
      prismaUserPF.email,
      prismaUserPF.name,
      prismaUserPF.lastName,
      prismaUserPF.birthday,
      prismaUserPF.phone,
      prismaUserPF.idSex,
      prismaUserPF.idLenguage,
      prismaUserPF.password,
      prismaUserPF.verify,
      prismaUserPF.createdAt,
      prismaUserPF.updatedAt
    )
  }
}
