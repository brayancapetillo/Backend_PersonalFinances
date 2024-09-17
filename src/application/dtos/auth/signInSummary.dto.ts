import { userPF } from '@prisma/client'

export type signInSummary = Pick<userPF, 'id' | 'name'>

export interface signInSummaryToken {
  accessToken: string
  refreshToken: string
}
