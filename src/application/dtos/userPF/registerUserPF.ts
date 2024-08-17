import { UserPF } from '@domain/entities/userPF.entity'

export type registerUserPFDTO = Omit<UserPF, 'id' | 'verify' | 'createdAt' | 'updatedAt'>
