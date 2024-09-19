import { RefreshTokenUseCase } from '@application/use-cases/auth/refreshTokenUseCase'
import { SignInUseCase } from '@application/use-cases/auth/signInUseCase'
import { SignUpUseCase } from '@application/use-cases/auth/signUpCaseUse'
import prisma from '@infrastructure/database/prisma/prismaClient'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'
import { BcryptService } from '@infrastructure/services/auth/bcrypt.service'
import { TokenService } from '@infrastructure/services/jwt/token.service'
import { AuthController } from '@presentation/controllers/auth.controller'
import { refreshTokenSchema } from '@presentation/middlewares/validators/schemas/auth/refreshTokenValidation'
import { signInSchema } from '@presentation/middlewares/validators/schemas/auth/signInValidation'
import { signUpSchema } from '@presentation/middlewares/validators/schemas/auth/signUpValidation'
import { validateSchema } from '@presentation/middlewares/validators/validationMiddleware'
import { Router } from 'express'

const router = Router()

const bcryptService = new BcryptService()
const tokenService = new TokenService()

const userPFPrismaRepository = new UserPFPrismaRepository(prisma)
const signUpCaseUse = new SignUpUseCase(userPFPrismaRepository, bcryptService)
const signInUseCase = new SignInUseCase(userPFPrismaRepository, bcryptService, tokenService)
const refreshTokenUseCase = new RefreshTokenUseCase(tokenService)
const authController = new AuthController(signUpCaseUse, signInUseCase, refreshTokenUseCase)

router.post('/signUp', validateSchema(signUpSchema), authController.signUp.bind(authController))

router.post('/signIn', validateSchema(signInSchema), authController.signIn.bind(authController))

router.post('/refreshToken', validateSchema(refreshTokenSchema), authController.refreshToken.bind(authController))

export { router }
