// -Express imports
import { CreateAccountUseCase } from '@application/use-cases/account/createAccountUseCase'
import prisma from '@infrastructure/database/prisma/prismaClient'
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'
import { AccountController } from '@presentation/controllers/account.controller'
import { verifyAuth } from '@presentation/middlewares/jwt/verifyAuth'
import { createAccountSchema } from '@presentation/middlewares/validators/schemas/account/createAccountValidation'
import { validateSchema } from '@presentation/middlewares/validators/validationMiddleware'
import { Router } from 'express'

// Create an instance of the Express router
const router = Router()

const accountPrismaRepository = new AccountPrismaRepository(prisma)
const userPFPrismaRepository = new UserPFPrismaRepository(prisma)

const createAccountUseCase = new CreateAccountUseCase(accountPrismaRepository, userPFPrismaRepository)

const accountController = new AccountController(createAccountUseCase)

router.post('/createAccount', verifyAuth, validateSchema(createAccountSchema), accountController.createAccount.bind(accountController))

export { router }
