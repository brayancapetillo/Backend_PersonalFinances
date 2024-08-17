import { RegisterUserPF } from '@application/use-cases/userPF/registerUserPF'
import { UserPFPrismaRepository } from '@infrastructure/database/prisma-repositories/userPF/userPFPrismaRepository'
import { UserPFController } from '@presentation/controllers/userPF.controller'
import { Router } from 'express'

const router: Router = Router()

const userPFPrismaRepository = new UserPFPrismaRepository()
const registerUSerPF = new RegisterUserPF(userPFPrismaRepository)
const userPFController = new UserPFController(registerUSerPF)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/register', userPFController.register.bind(userPFController))

export default router
