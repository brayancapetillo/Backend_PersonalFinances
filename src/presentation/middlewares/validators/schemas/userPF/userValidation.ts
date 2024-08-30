import { z } from 'zod'

export const userRegistrationSchema = z.object({
  email: z.string({ required_error: 'email is required', invalid_type_error: 'email must be string' }).nonempty('email cannot be empty').email('email must be valid'),
  name: z.string({ required_error: 'name is required', invalid_type_error: 'name must be string' }).nonempty('name cannot be empty').min(3, 'name must be at least 3 characters long'),
  lastName: z.string({ required_error: 'lastName is required' }).min(3, 'lastName must be at least 3 characters long').nullable(),
  birthday: z.string({ required_error: 'birthday is required' }).date('birthday must be date').nonempty('birthday cannot be empty').nullable(),
  phone: z.string().nonempty('phone cannot be empty').length(10, 'phone must be exactly 10 characters long').nullable().optional(),
  idSex: z.number().int().positive('idSex must be a positive integer'),
  idLenguage: z.number().int().positive('idLenguage must be a positive integer'),
  password: z.string().nonempty('password cannot be empty').min(6, 'password must be at least 6 characters long')
})
