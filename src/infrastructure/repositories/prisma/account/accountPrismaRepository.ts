import { Account } from '@domain/entities/account.entity'
import { AccountType } from '@domain/entities/accountType.entity'
import { Bank } from '@domain/entities/bank,entity'
import { IAccountRepository } from '@domain/interfaces/accountRepository'
import { accountType, bank, account as prismaAccount, PrismaClient } from '@prisma/client'
import { taccountType } from '@shared/types/accountType.type'
import { tBank } from '@shared/types/bank.type'

export class AccountPrismaRepository implements IAccountRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) { this.prisma = prisma }

  public async findById (id: number): Promise<Account | null> {
    const account: prismaAccount | null = await this.prisma.account.findUnique({ where: { id }, include: { bank: true, accountType: true } })
    return account !== null ? this.toDomain(account) : null
  }

  public async findByAccountNumber (accountNumber: string): Promise<Account | null> {
    const account: prismaAccount | null = await this.prisma.account.findUnique({ where: { accountNumber }, include: { bank: true, accountType: true } })
    return account !== null ? this.toDomain(account) : null
  }

  public async findAllByUserId (idUser: number): Promise<Account[]> {
    const allAccounts: prismaAccount[] = await this.prisma.account.findMany({ where: { idUser }, include: { bank: true, accountType: true } })
    return allAccounts.map(this.toDomain)
  }

  public async create (account: Account): Promise<Account> {
    const savedAccount: prismaAccount = await this.prisma.account.create(
      {
        data:
            {
              idUser: account.idUser,
              name: account.name,
              idBank: account.idBank,
              idAccountType: account.idAccountType,
              balance: account.balance,
              accountNumber: account.accountNumber,
              createdAt: account.createdAt
            }
      }
    )

    return this.toDomain(savedAccount)
  }

  public async update (account: Account): Promise<Account> {
    const updateAccount: prismaAccount = await this.prisma.account.update(
      {
        where: { id: account.id },
        data:
        {
          name: account.name,
          idBank: account.idBank,
          idAccountType: account.idAccountType,
          balance: account.balance,
          accountNumber: account.accountNumber
        }
      }
    )

    return this.toDomain(updateAccount)
  }

  public async delete (id: number): Promise<void> {
    await this.prisma.account.delete({ where: { id } })
  }

  private toDomain (prismaAccount: (prismaAccount & { bank?: bank } & { accountType?: accountType })): Account {
    return new Account(
      prismaAccount.id,
      prismaAccount.idUser,
      prismaAccount.name,
      prismaAccount.idBank,
      prismaAccount.idAccountType,
      prismaAccount.balance.toNumber(),
      prismaAccount.accountNumber,
      prismaAccount.createdAt,
      prismaAccount.bank !== undefined ? new Bank(prismaAccount.bank.id, prismaAccount.bank.name as tBank) : undefined,
      prismaAccount.accountType !== undefined ? new AccountType(prismaAccount.accountType.id, prismaAccount.accountType.name as taccountType) : undefined
    )
  }
}
