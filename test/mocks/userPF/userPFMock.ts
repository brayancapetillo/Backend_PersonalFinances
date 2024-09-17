import { UserPF } from '@domain/entities/userPF.entity'

export const userPFMock: UserPF = new UserPF(
  1,
  'brayanexample@example.com',
  'brayan capetillo',
  null,
  null,
  '1234567789',
  1,
  1,
  'password123',
  false,
  new Date(),
  new Date()
)
