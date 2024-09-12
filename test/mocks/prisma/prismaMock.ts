
// -Library and tool imports
import sinon from 'sinon'

// -Prisma client imports
import prisma from '@infrastructure/database/prisma/prismaClient'

// -Types (interfaces) imports
import { PrismaMock } from '@shared/types/mocks/prisma/prisma.type'

/**
 * Creates a Prisma client mock for testing purposes.
 *
 * This mock replaces the 'prisma.UserPF' methods whit Sinon stubs.
 *
 * @returns {PrismaMock} an object containing the stub for 'UserPF' methods.
 */
export function createPrismaMock (): PrismaMock {
  return {
    userPF: {
      findUnique: sinon.stub(prisma.userPF, 'findUnique'),
      findFirst: sinon.stub(prisma.userPF, 'findFirst'),
      create: sinon.stub(prisma.userPF, 'create')
    }
  }
}
