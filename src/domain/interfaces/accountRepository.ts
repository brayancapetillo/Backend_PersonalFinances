/**
 * @file IAccountRepository.ts
 * @description This interface defines the contract for account repository operations.
 * It includes methods for CRUD operations and retrieval of accounts.
 *
 * @module Repositories/Account
 */

// -DTO's import
import { updateAccountDTO } from '@application/dtos/account/updateAccount.dto'

// -Entity's import
import { Account } from '@domain/entities/account.entity'

/**
 * @interface IAccountRepository
 * @description Defines the methods required for the account repository.
 */
export interface IAccountRepository {
  findById: (id: number) => Promise<Account | null>
  findByAccountNumber: (accountNumber: string) => Promise<Account | null>
  update: (id: number, account: updateAccountDTO) => Promise<Account>
  create: (account: Account) => Promise<Account>
  delete: (id: number) => Promise<void>
}
