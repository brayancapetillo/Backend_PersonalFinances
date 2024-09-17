import { UserPF } from '@domain/entities/userPF.entity'

export type signUpDTO = Omit<UserPF, 'id' | 'verify' | 'createdAt' | 'updatedAt'>
