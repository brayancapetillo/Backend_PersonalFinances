import { signInDTO } from '@application/dtos/auth/signIn.dto'
import { signInSummaryToken } from '@application/dtos/auth/signInSummary.dto'
import { UserPFPrismaRepository } from '@infrastructure/repositories/prisma/userPF/userPFPrismaRepository'
import { BcryptService } from '@infrastructure/services/auth/bcrypt.service'
import { TokenService } from '@infrastructure/services/jwt/token.service'
import { userPF } from '@prisma/client'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import { HttpError } from '@shared/utils/error/httpError'

export class SignInUseCase {
  constructor (
    private readonly UserPFRepository: UserPFPrismaRepository,
    private readonly bcryptService: BcryptService,
    private readonly tokenService: TokenService
  ) {}

  public async execute (signInDTO: signInDTO): Promise<signInSummaryToken> {
    const user: userPF | null = await this.UserPFRepository.findByEmail(signInDTO.email)
    if (user === null) throw new HttpError(clientErrorStatusCodes.UNAUTHORIZED, 'user not found')

    const isValidPassword: boolean = await this.bcryptService.comparePassword(signInDTO.password, user.password)
    if (!isValidPassword) throw new HttpError(clientErrorStatusCodes.FORBIDDEN, 'incorrect password')

    const accessToken: string = this.tokenService.generateAccessToken({ id: user.id, name: user.name })
    const refreshToken: string = this.tokenService.generateRefreshToken({ id: user.id, name: user.name })

    const tokens: signInSummaryToken = { accessToken, refreshToken }

    const x = this.tokenService.verifyAccessToken(accessToken)
    console.log(x)

    return tokens
  }
}
