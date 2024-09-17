import { userPF } from '@prisma/client'
import { userPFMock } from './userPFMock'
import { userSummaryDTO } from '@application/dtos/userPF/userSummary'

const userPFMocked: userPF = userPFMock

export const userSummaryMock: userSummaryDTO = {
  id: 1,
  email: userPFMocked.email,
  name: userPFMocked.name,
  lastName: userPFMocked.lastName,
  birthday: userPFMocked.birthday,
  phone: userPFMocked.phone,
  idSex: userPFMocked.idSex,
  idLenguage: userPFMocked.idLenguage,
  verify: false,
  createdAt: new Date(),
  updatedAt: new Date()
}
