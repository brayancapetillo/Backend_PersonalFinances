/**
 * @file category.routes.ts
 * @description Defines routes related to category operations.
 */

// -Express imports
import { Router } from 'express'

// -Prisma imports
import prisma from '@infrastructure/database/prisma/prismaClient'

// -Repository's imports
import { CategoryPrismaRepository } from '@infrastructure/repositories/prisma/category/categoryPrismaRepository'

// -Controller's imports
import { CategoryController } from '@presentation/controllers/category.controller'

// -Middleware's imports
import { verifyAuth } from '@presentation/middlewares/jwt/verifyAuth'

// -Use Case's imports
import { GetCategoriesUseCase } from '@application/use-cases/category/getCategoriesUseCase'

// Create an instance of the Express router
const router = Router()

// Create an instance of the category prisma repository
const categoryPrismaRepository = new CategoryPrismaRepository(prisma)

// Create an instance of the use case for category
const getCategoriesUseCase = new GetCategoriesUseCase(categoryPrismaRepository)

// Create an instance of the category controller
const categoryController = new CategoryController(getCategoriesUseCase)

/**
 * @route GET /
 * @description Retrieves the list of categories.
 * @access Private - Requires authentication.
 * @middleware verifyAuth - Validates the authentication token.
 * @returns {successResponseOptions<Category[]>} 200 - An array of categories.
 * @returns {errorResponse} 500 - Internal server error.
 */
router.get('/', verifyAuth, categoryController.getCategories.bind(categoryController))

export { router }
