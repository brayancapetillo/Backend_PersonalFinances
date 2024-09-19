import { signInDTO } from '@application/dtos/auth/signIn.dto'
import { userPF } from '@prisma/client'
import { userPFMock } from '../userPF/userPFMock'

const userPFMocked: userPF = userPFMock

export const signInMock: signInDTO = {
  email: userPFMocked.email,
  password: userPFMocked.password
}
