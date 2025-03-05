import { userPF } from '@prisma/client'

export type signInDTO = Pick<userPF, 'email' | 'password'>

export type signInSummary = Pick<userPF, 'id' | 'name'>
