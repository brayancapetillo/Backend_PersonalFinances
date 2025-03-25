/**
 * @file transaction.routes.ts
 * @description Defines routes related to transaction operations.
 */

// -Express imports
import { Router } from 'express'

// -Prisma imports
import prisma from '@infrastructure/database/prisma/prismaClient'

// -Repository's imports
import { TransactionPFPrismaRepository } from '@infrastructure/repositories/prisma/transactionPF/transactionPFPrismaRepository'
import { AccountPrismaRepository } from '@infrastructure/repositories/prisma/account/accountPrismaRepository'

// -Controller's imports
import { TransactionPFController } from '@presentation/controllers/transactionPF.controller'

// -Middleware's imports
import { verifyAuth } from '@presentation/middlewares/jwt/verifyAuth'

// -Use Case's imports
import { CreateTransactionPFUseCase } from '@application/use-cases/TransactionPF/createcreateTransactionPFUseCase'

// -Validation schema's imports
import { createTransactionPFSchema } from '@presentation/middlewares/validators/schemas/transactionPF/createTransactionPFValidation'
import { validateSchema } from '@presentation/middlewares/validators/validationMiddleware'

// Create an instance of the Express router
const router = Router()

// Create repository instance
const transactionPFPrismaRepository = new TransactionPFPrismaRepository(prisma)
const accountPrismaRepository = new AccountPrismaRepository(prisma)

// Create use case instances
const createTransactionPFUseCase = new CreateTransactionPFUseCase(transactionPFPrismaRepository, accountPrismaRepository)

// Create controller instance
const transactionPFController = new TransactionPFController(createTransactionPFUseCase)

/**
 * @route POST /api/transactions
 * @description Create a transaction
 * @access Private - Requires authentication.
 * @middleware verifyAuth - Validates the authentication token.
 * @middleware validateSchema(createTransactionPFSchema) - Validates the request body against the schema.
 * @returns {successResponseOptions<TransactionPF>} 201 - A transactionPF created.
 * @returns {errorResponse} 400 - Validation error in the request body.
 * @returns {errorResponse} 421 - Invalid account in transaction.
 * @returns {errorResponse} 500 - Internal server error.
 */
router.post('/', verifyAuth, validateSchema(createTransactionPFSchema), transactionPFController.createTransactionPF.bind(transactionPFController))

export { router }
