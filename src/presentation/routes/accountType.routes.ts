/**
 * @file accountType.routes.ts
 * @description Defines routes related to account types operations.
 */

// -Express imports
import { Router } from 'express'

// -Prisma imports
import prisma from '@infrastructure/database/prisma/prismaClient'

// -Repository's imports
import { AccountTypePrismaRepository } from '@infrastructure/repositories/prisma/accountType/accountTypePrismaRepository'

// -Controller's imports
import { AccountTypeController } from '@presentation/controllers/accountType.controller'

// -Middleware's imports
import { verifyAuth } from '@presentation/middlewares/jwt/verifyAuth'

// -Use Case's imports
import { GetAccountsTypeUseCase } from '@application/use-cases/accountType/getAccountsTypeUseCase'

// Create an instance of the bank prisma repository
// Create an intances of the use case's for bank
// Create an instance of the bank controller

// -Library and tool imports

// Create an instance of the Express router
const router = Router()

// Create an instance of accountType prisma repository
const accountTypePrismaRepository = new AccountTypePrismaRepository(prisma)

// Create an instances of the use case's for accountType
const getAccountsTypeUseCase = new GetAccountsTypeUseCase(accountTypePrismaRepository)

// Create an instance of the AccountType controller
const accountTypeController = new AccountTypeController(getAccountsTypeUseCase)

/**
 * @route GET /
 * @description Retrieves the list of accounts type.
 * @access Private - Requires authentication.
 * @middleware verifyAuth - Validates the authentication token.
 * @returns {successResponseOptions<AccountType[]>} 200 - An array of accounts Type.
 * @returns {errorResponse} 500 - Internal server error.
 */
router.get('/', verifyAuth, accountTypeController.getAccountsType.bind(accountTypeController))

export { router }
