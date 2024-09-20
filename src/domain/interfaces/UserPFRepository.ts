/**
 * @file UserPFRepository.ts
 * @description This interface defines the contract for UserPF repository implementations.
 * It specifies the methods that any UserPF repository should implement for managing
 * UserPF entities in a data store.
 *
 * @module Repositories
 */

// -Entity's import
import { UserPF } from '@domain/entities/userPF.entity'

/**
 * UserPFRepository interface
 *
 * This interface defines the methods required for interacting with UserPF data.
 * Implementing classes must provide concrete implementations of these methods.
 */
export interface UserPFRepository {
  create: (userPF: UserPF) => Promise<UserPF>
  findById: (id: number) => Promise<UserPF | null>
  findByEmail: (email: string) => Promise<UserPF | null>
  findByPhone: (phone: string) => Promise<UserPF | null>
}
