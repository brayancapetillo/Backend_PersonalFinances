import { SignUpUseCase } from '@application/use-cases/auth/signUpCaseUse'
import prisma from '@infrastructure/database/prisma/prismaClient'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'
import { BcryptService } from '@infrastructure/services/auth/bcrypt.service'
import { AuthController } from '@presentation/controllers/auth.controller'
import { signUpSchema } from '@presentation/middlewares/validators/schemas/auth/signUpValidation'
import { validateSchema } from '@presentation/middlewares/validators/validationMiddleware'
import { Router } from 'express'

const router = Router()

const bcryptService = new BcryptService()

const userPFPrismaRepository = new UserPFPrismaRepository(prisma)
const signUpCaseUse = new SignUpUseCase(userPFPrismaRepository, bcryptService)
const authController = new AuthController(signUpCaseUse)

router.post('/signUp', validateSchema(signUpSchema), authController.signUp.bind(authController))

export { router }
