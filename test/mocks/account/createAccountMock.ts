import { createAccountDTO } from '@application/dtos/account/createAccount.dto'
import { accountMock, accountTwoMock } from './accountMock'
import { Account } from '@domain/entities/account.entity'
import { account as prismaAccount } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

const accountInstance: Account = accountMock
const accountTwoInstance: Account = accountTwoMock

export const createAccountMock: createAccountDTO = {
  idUser: accountInstance.idUser,
  name: accountInstance.name,
  idBank: accountInstance.idBank,
  idAccountType: accountInstance.idAccountType,
  balance: accountInstance.balance,
  accountNumber: accountInstance.accountNumber
}

export const createSecundAccountMock: createAccountDTO = {
  idUser: accountTwoInstance.idUser,
  name: accountTwoInstance.name,
  idBank: accountTwoInstance.idBank,
  idAccountType: accountTwoInstance.idAccountType,
  balance: accountTwoInstance.balance,
  accountNumber: accountTwoInstance.accountNumber
}

export const accountPrismaMock: prismaAccount = {
  id: accountMock.id,
  idUser: accountMock.idUser,
  name: accountMock.name,
  idBank: accountMock.idBank,
  idAccountType: accountMock.idAccountType,
  balance: new Decimal(accountMock.balance),
  accountNumber: accountMock.accountNumber,
  createdAt: accountMock.createdAt,
  updatedAt: accountMock.updatedAt
}
