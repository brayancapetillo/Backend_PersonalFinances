import { refreshTokenDTO, tokenSummary } from '@application/dtos/auth/refreshToken.dto'

export const tokenSummaryMock: tokenSummary = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsIm5hbWUiOiJicmF5YW4gY2FwZXRpbGxvIiwiaWF0IjoxNzI2NTQ0NDYwLCJleHAiOjE3MjY1NDUzNjB9.nbmfor3ulz1oRqNRz3Rzb2X9DPKx1OUSSxJT7SFRHKM',
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQsIm5hbWUiOiJicmF5YW4gY2FwZXRpbGxvIiwiaWF0IjoxNzI2NTQ0NDYwLCJleHAiOjE3MjY1NDUzNjB9.nbmfor3ulz1oRqNRz3Rzb2X9DPKx1OUSSxJT7SFRHKM'
}

export const tokenRefreshMock: refreshTokenDTO = {
  refreshToken: tokenSummaryMock.refreshToken
}
