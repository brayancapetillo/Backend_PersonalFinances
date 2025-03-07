/**
 * @file bank.routes.ts
 * @description Defines routes related to bank operations.
 */

// -Express imports
import { Router } from 'express'

// -Prisma imports
import prisma from '@infrastructure/database/prisma/prismaClient'

// -Repository's imports
import { BankPrismaRepository } from '@infrastructure/repositories/prisma/bank/bankPrismaRepository'

// -Controller's imports
import { BankController } from '@presentation/controllers/bank.controller'

// -Middleware's imports
import { verifyAuth } from '@presentation/middlewares/jwt/verifyAuth'

// -Use Case's imports
import { GetBanksUseCase } from '@application/use-cases/bank/getBanksUseCase'
import { GetBankUseCase } from '@application/use-cases/bank/getBankUseCase'

// -Validation schema's imports
import { validateParamsSchema } from '@presentation/middlewares/validators/validationParamsMiddleware'
import { bankIdSchema } from '@presentation/middlewares/validators/schemas/bank/getBankValidation'

// Create an instance of the Express router
const router = Router()

// Create an instance of the bank prisma repository
const bankPrismaRepository = new BankPrismaRepository(prisma)

// Create an intances of the use case's for bank
const getBanksUseCase = new GetBanksUseCase(bankPrismaRepository)
const getBankUseCase = new GetBankUseCase(bankPrismaRepository)

// Create an instance of the bank controller
const bankController = new BankController(getBanksUseCase, getBankUseCase)

/**
 * @route GET /
 * @description Retrieves the list of banks.
 * @access Private - Requires authentication.
 * @middleware verifyAuth - Validates the authentication token.
 * @returns {successResponseOptions<Bank[]>} 200 - An array of banks.
 * @returns {errorResponse} 500 - Internal server error.
 */
router.get('/', verifyAuth, bankController.getBanks.bind(bankController))

/**
 * @route GET /:id
 * @description Retrieves a bank by its ID.
 * @param {string} id - The ID of the bank to retrieve.
 * @access Private - Requires authentication.
 * @middleware verifyAuth - Validates the authentication token.
 * @middleware validateParamsSchema(bankIdSchema) - Validates the request parameters.
 * @returns {successResponseOptions<Bank>} 200 - The bank data.
 * @returns {errorResponse} 404 - Bank not found.
 * @returns {errorResponse} 500 - Internal server error.
 */
router.get('/:id', verifyAuth, validateParamsSchema(bankIdSchema), bankController.getBank.bind(bankController))

export { router }
