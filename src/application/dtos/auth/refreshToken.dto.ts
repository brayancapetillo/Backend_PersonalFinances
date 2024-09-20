export interface tokenSummary {
  accessToken: string
  refreshToken: string
}

export type refreshTokenDTO = Pick<tokenSummary, 'refreshToken'>
