import { tokenSummary } from '@application/dtos/auth/refreshToken.dto'
import { signInDTO } from '@application/dtos/auth/signIn.dto'
import { clientErrorStatusCodes } from '@shared/constants/http/clientErroStatusCode'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from 'src/main/app'

chai.use(chaiHttp)

export const generateTokenIT = async (): Promise<string> => {
  try {
    const requestBody: signInDTO = { email: 'brayancapeto@example.com', password: 'password123' }

    // Make the HTTP request to the signIn endpoint
    const response = await chai.request(app).post('/_api/v/auth/signIn').send(requestBody)

    const { status, body } = response

    if (status === clientErrorStatusCodes.UNAUTHORIZED) throw new Error('user not found')
    if (status === clientErrorStatusCodes.FORBIDDEN) throw new Error('incorrect password')
    if (status === clientErrorStatusCodes.BAD_REQUEST) throw new Error('request body is invalid')

    const data: tokenSummary = body.data

    return data.accessToken
  } catch (error: any) {
    throw new Error(error)
  }
}
