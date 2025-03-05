import { Account } from '@domain/entities/account.entity'
import { accountMock } from './accountMock'
import { account as prismaAccount } from '@prisma/client'
import { Bank } from '@domain/entities/bank,entity'
import { AccountType } from '@domain/entities/accountType.entity'
import { updateAccountDTO } from '@application/dtos/account/updateAccount.dto'
import { Decimal } from '@prisma/client/runtime/library'

const accountInstance: Account = accountMock

export const updatedAccountMock: Account = new Account(
  accountInstance.id,
  accountInstance.idUser,
  'Citibanamex',
  2,
  2,
  0.002,
  '000000000000000001',
  accountInstance.createdAt,
  accountInstance.updatedAt,
  new Bank(2, 'Citibanamex'),
  new AccountType(2, 'Credit')
)

export const updateAccountDTOMock: updateAccountDTO = {
  name: updatedAccountMock.name,
  idBank: updatedAccountMock.idBank,
  idAccountType: updatedAccountMock.idAccountType,
  balance: updatedAccountMock.balance,
  accountNumber: updatedAccountMock.accountNumber
}

export const accountUpdatePrismaMock: prismaAccount = {
  id: updatedAccountMock.id,
  idUser: updatedAccountMock.idUser,
  name: updatedAccountMock.name,
  idBank: updatedAccountMock.idBank,
  idAccountType: updatedAccountMock.idAccountType,
  balance: new Decimal(updatedAccountMock.balance),
  accountNumber: updatedAccountMock.accountNumber,
  createdAt: updatedAccountMock.createdAt,
  updatedAt: updatedAccountMock.updatedAt
}
