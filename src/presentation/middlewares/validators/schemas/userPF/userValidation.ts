import { z } from 'zod'

export const userRegistrationSchema = z.object({
  email: z.string({ required_error: 'email cannot be empty', invalid_type_error: 'email must be string' }).email('email must be valid'),
  name: z.string({ required_error: 'name is required', invalid_type_error: 'name must be string' }).nonempty('name cannot be empty').min(3, 'name must be at least 3 characters long'),
  lastName: z.string().min(3, 'lastName must be at least 3 characters long').optional().nullable(),
  birthday: z.date().nullable().optional(),
  phone: z.string().length(10, 'phone must be exactly 10 characters long').nullable().optional(),
  idSex: z.number().int().positive('idSex must be a positive integer'),
  idLenguage: z.number().int().positive('idLenguage must be a positive integer'),
  password: z.string().min(6, 'password must be at least 6 characters long')
})
