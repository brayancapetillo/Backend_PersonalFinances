/**
 * @file prisma.ts
 * @description This module creates and exports a singleton instance of PrismaClient,
 * which is used to interact with the database. It ensures that only one instance of
 * PrismaClient is used throughout the application, optimizing database connections.
 *
 * @module Database
 */

// -Prisma's import
import { PrismaClient } from '@prisma/client'

// Create instance of PrismaClient
const prisma: PrismaClient = new PrismaClient()

// Export instance PrismaClient
export default prisma
