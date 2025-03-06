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
import { GetBanksUseCase } from '@application/use-cases/bank/GetBanksUseCase'

// Create an instance of the Express router
const router = Router()

const bankPrismaRepository = new BankPrismaRepository(prisma)

const getBankUseCase = new GetBanksUseCase(bankPrismaRepository)

const bankController = new BankController(getBankUseCase)

/**
 * @route GET /
 * @description Retrieves the list of banks.
 * @access Private
 */
router.get('/', verifyAuth, bankController.getBanks.bind(bankController))

export { router }
