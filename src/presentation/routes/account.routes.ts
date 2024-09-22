// -Express imports
import { CreateAccountUseCase } from '@application/use-cases/account/createAccountUseCase'
import { GetAccountUseCase } from '@application/use-cases/account/getAccountUseCase'
import prisma from '@infrastructure/database/prisma/prismaClient'
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'
import { AccountController } from '@presentation/controllers/account.controller'
import { verifyAuth } from '@presentation/middlewares/jwt/verifyAuth'
import { createAccountSchema } from '@presentation/middlewares/validators/schemas/account/createAccountValidation'
import { accountIdSchema } from '@presentation/middlewares/validators/schemas/account/getAccountValidation'
import { validateSchema } from '@presentation/middlewares/validators/validationMiddleware'
import { validateParamsSchema } from '@presentation/middlewares/validators/validationParamsMiddleware'
import { Router } from 'express'

// Create an instance of the Express router
const router = Router()

const accountPrismaRepository = new AccountPrismaRepository(prisma)
const userPFPrismaRepository = new UserPFPrismaRepository(prisma)

const createAccountUseCase = new CreateAccountUseCase(accountPrismaRepository, userPFPrismaRepository)
const getAccountUseCase = new GetAccountUseCase(accountPrismaRepository)

const accountController = new AccountController(createAccountUseCase, getAccountUseCase)

router.post('/createAccount', verifyAuth, validateSchema(createAccountSchema), accountController.createAccount.bind(accountController))

router.get('/account/:id', verifyAuth, validateParamsSchema(accountIdSchema), accountController.getAccount.bind(accountController))

export { router }
