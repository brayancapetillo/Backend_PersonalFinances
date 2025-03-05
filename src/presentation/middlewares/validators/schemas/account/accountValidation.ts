import { z } from 'zod'

export const accountSchema = z.object({
  id: z.number().int().positive('id must be a positive integer'),
  idUser: z.number().int().positive('idUser must be a positive integer'),
  name: z.string().nonempty('name cannot be empty').min(3, 'name must be at least 3 characters long'),
  idBank: z.number().int().positive('idBank must be a positive integer'),
  idAccountType: z.number().int().positive('idAccountType must be a positive integer'),
  balance: z.number().positive('balance must be a positive decimal'),
  accountNumber: z.string().regex(/^\d+$/, { message: 'The card number must contain only digits' }).min(18, 'accountNumber must be at least 18 characters long').max(20, 'accountNumber must be at most 20 characters long'),
  creditUsed: z.number().positive('creditUsed must be a positive decimal').nullable().optional(),
  creditLimit: z.number().positive('creditLimit must be a positive decimal').nullable().optional(),
  cutOffDate: z.string({ required_error: 'cutOffDate is required' }).date('cutOffDate must be date').nonempty('cutOffDate cannot be empty').nullable().optional(),
  paymentDueDate: z.string({ required_error: 'paymentDueDate is required' }).date('paymentDueDate must be date').nonempty('paymentDueDate cannot be empty').nullable().optional()
})

export const accountParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id must be a number').refine((val) => parseInt(val, 10) > 0, { message: 'id must be a positive number' }),
  idUser: z.string().regex(/^\d+$/, 'id must be a number').refine((val) => parseInt(val, 10) > 0, { message: 'id must be a positive number' })
})
