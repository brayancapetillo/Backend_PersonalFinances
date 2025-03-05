// -Express imports
import { CreateAccountUseCase } from '@application/use-cases/account/createAccountUseCase'
import { DeleteAccountUseCase } from '@application/use-cases/account/DeleteAccountUseCase'
import { GetAccountUseCase } from '@application/use-cases/account/getAccountUseCase'
import { UpdateAccountUseCase } from '@application/use-cases/account/updateAccountUseCase'
import prisma from '@infrastructure/database/prisma/prismaClient'
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'
import { AccountController } from '@presentation/controllers/account.controller'
import { dataUserBody } from '@presentation/middlewares/custom/DataUserBody'
import { verifyAuth } from '@presentation/middlewares/jwt/verifyAuth'
import { createAccountSchema } from '@presentation/middlewares/validators/schemas/account/createAccountValidation'
import { accountIdSchema } from '@presentation/middlewares/validators/schemas/account/getAccountValidation'
import { updateAccountSchema } from '@presentation/middlewares/validators/schemas/account/updateAccountSchema'
import { validateSchema } from '@presentation/middlewares/validators/validationMiddleware'
import { validateParamsSchema } from '@presentation/middlewares/validators/validationParamsMiddleware'
import { Router } from 'express'

// Create an instance of the Express router
const router = Router()

const accountPrismaRepository = new AccountPrismaRepository(prisma)
const userPFPrismaRepository = new UserPFPrismaRepository(prisma)

const createAccountUseCase = new CreateAccountUseCase(accountPrismaRepository, userPFPrismaRepository)
const getAccountUseCase = new GetAccountUseCase(accountPrismaRepository)
const updateAccountUseCase = new UpdateAccountUseCase(accountPrismaRepository)
const deleteAccountUseCase = new DeleteAccountUseCase(accountPrismaRepository)

const accountController = new AccountController(createAccountUseCase, getAccountUseCase, updateAccountUseCase, deleteAccountUseCase)

router.post('/', [verifyAuth, dataUserBody], validateSchema(createAccountSchema), accountController.createAccount.bind(accountController))

router.get('/:id', verifyAuth, validateParamsSchema(accountIdSchema), accountController.getAccount.bind(accountController))

router.put('/', verifyAuth, validateSchema(updateAccountSchema), accountController.updateAccount.bind(accountController))

router.delete('/:id', verifyAuth, validateParamsSchema(accountIdSchema), accountController.deleteAccount.bind(accountController))

export { router }
