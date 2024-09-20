/**
 * @file userPFPrismaRepository.ts
 * @description Repository class for managing UserPF entities using Prisma as the ORM.
 * This class implements the UserPFRepository interface and provides methods for
 * interacting with the userPF table in the database.
 *
 * @module Repositories/UserPF
 */

// -Entity's import
import { UserPFRepository } from '@domain/interfaces/UserPFRepository'
import { UserPF } from '@domain/entities/userPF.entity'

// -Prisma's import
import { PrismaClient, userPF as prismaUserPF } from '@prisma/client'

/**
 * UserPFPrismaRepository class for handling database operations related to UserPF entities.
 * This class implements the UserPFRepository interface, providing methods for
 * retrieving and creating UserPF entities in the database.
 */
export class UserPFPrismaRepository implements UserPFRepository {
  private readonly prisma: PrismaClient

  /**
   * Constructor for UserPFPrismaRepository.
   *
   * @param {PrismaClient} prisma - An instance of PrismaClient for database operations.
   */
  constructor (prisma: PrismaClient) { this.prisma = prisma }

  /**
   * Finds a UserPF by its ID.
   *
   * @param {number} id - The ID of the UserPF to find.
   * @returns {Promise<UserPF | null>} A promise that resolves to the UserPF entity if found, or null if not.
   */
  public async findById (id: number): Promise<UserPF | null> {
    const user: prismaUserPF | null = await this.prisma.userPF.findUnique({ where: { id } })
    return user !== null ? this.toDomain(user) : null
  }

  /**
   * Finds a UserPF by its email.
   *
   * @param {string} email - The email of the UserPF to find.
   * @returns {Promise<UserPF | null>} A promise that resolves to the UserPF entity if found, or null if not.
   */
  public async findByEmail (email: string): Promise<UserPF | null> {
    const user: prismaUserPF | null = await this.prisma.userPF.findUnique({ where: { email } })
    return user !== null ? this.toDomain(user) : null
  }

  /**
   * Finds a UserPF by its phone number.
   *
   * @param {string} phone - The phone number of the UserPF to find.
   * @returns {Promise<UserPF | null>} A promise that resolves to the UserPF entity if found, or null if not.
   */
  public async findByPhone (phone: string): Promise<UserPF | null> {
    const user: prismaUserPF | null = await this.prisma.userPF.findFirst({ where: { phone } })
    return user !== null ? this.toDomain(user) : null
  }

  /**
   * Creates a new UserPF in the database.
   *
   * @param {UserPF} user - The UserPF entity to create.
   * @returns {Promise<UserPF>} A promise that resolves to the created UserPF entity.
   */
  public async create (user: UserPF): Promise<UserPF> {
    const savedUser: prismaUserPF = await this.prisma.userPF.create(
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

  /**
   * Converts a Prisma userPF entity to a domain UserPF entity.
   *
   * @param {prismaUserPF} prismaUserPF - The Prisma userPF entity to convert.
   * @returns {UserPF} The converted UserPF entity.
   */
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
