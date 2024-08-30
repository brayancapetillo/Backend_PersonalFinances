import { UserPF } from '@domain/entities/userPF.entity'

export type userSummaryDTO = Omit<UserPF, 'password'>
