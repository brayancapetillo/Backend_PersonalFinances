import { UserPF } from '@domain/entities/userPF.entity'

export interface UserPFRepository {
  register: (userPF: UserPF) => Promise<UserPF>
  findById: (id: number) => Promise<UserPF | null>
  findByEmail: (email: string) => Promise<UserPF | null>
  findByPhone: (phone: string) => Promise<UserPF | null>
}
