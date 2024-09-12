import { UserPF } from '@domain/entities/userPF.entity'

// Helper functions for setting up mock data
export const createMockUser = (): UserPF => new UserPF(
  1,
  'brayanexample@example.com',
  'brayan capetillo',
  null,
  null,
  '4493465148',
  1,
  1,
  'hashedPassword123',
  false,
  new Date(),
  new Date()
)
