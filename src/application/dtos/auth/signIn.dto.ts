import { userPF } from '@prisma/client'

export type signInDTO = Pick<userPF, 'email' | 'password'>
