// -Library and tool imports
import { SinonStub } from 'sinon'

/**
 * Represents the mock implementation for the `userPF` model in Prisma.
 *
 * This interface defines stubs for `findUnique`, `findFirst`, and `create` methods,
 * which are used in unit tests to simulate Prisma behavior.
 */
export interface UserPFMock {
  findUnique: SinonStub
  findFirst: SinonStub
  create: SinonStub

}

/**
 * Represents the Prisma mock, containing a mock implementation of the `userPF` model.
 */
export interface PrismaMock {
  userPF: UserPFMock
}
