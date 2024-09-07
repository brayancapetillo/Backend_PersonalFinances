import { RegisterUserPF } from '@application/use-cases/userPF/registerUserPF'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'

import { UserPFController } from '@presentation/controllers/userPF.controller'
import { userRegistrationSchema } from '@presentation/middlewares/validators/schemas/userPF/userValidation'
import { validateSchema } from '@presentation/middlewares/validators/validationMiddleware'
import { Router } from 'express'

const router: Router = Router()

const userPFPrismaRepository = new UserPFPrismaRepository()
const registerUSerPF = new RegisterUserPF(userPFPrismaRepository)
const userPFController = new UserPFController(registerUSerPF)

router.post('/register', validateSchema(userRegistrationSchema), userPFController.register.bind(userPFController))

export default router
