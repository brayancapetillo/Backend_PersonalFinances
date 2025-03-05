import { Account } from '@domain/entities/account.entity'
import { bankMock } from '../bank/bankMock'
import { accountTypeMock } from '../accountType/accountType'

export const accountMock: Account = new Account(
  1,
  1,
  'name account example',
  1,
  1,
  0.001,
  '000000000000000000',
  new Date(),
  new Date(),
  bankMock,
  accountTypeMock
)

export const accountTwoMock: Account = new Account(
  2,
  1,
  'name account example two',
  1,
  1,
  0.001,
  '000000000000000001',
  new Date(),
  new Date(),
  bankMock,
  accountTypeMock
)
