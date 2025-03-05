/**
 * @file index.ts
 * @description This file acts as the central point for all API routes.
 * It dynamically loads and groups routes related to each module of the application.
 * @module Routes
 */

// -Express imports
import { Router } from 'express'

// -Node.js imports
import { readdirSync } from 'fs'

// Definition of the current directory path
const pathRouter = `${__dirname}`

// Create an instance of the Express router
const router = Router()

/**
 * Cleans th file name by removing its expresion.
 *
 * @param fileName - The name of the file clean.
 * @returns {string} - The cleaned file name without the extension.
 */
const cleanFileName = (fileName: string): string => { return fileName.split('.').shift() ?? '' }

// Read all files in the current directory and filter for route files
readdirSync(pathRouter).filter((fileName: string) => {
  const name: string = cleanFileName(fileName)

  // Import route modules except for the 'index' file
  if (name !== 'index') {
    void import(`./${name}.routes`).then((moduleRouter) => {
      // Use the imported router for the corresponding API version
      router.use(`/_api/v/${name}`, moduleRouter.router)
    })
    return true
  }
  return false
})

// Export the configured router
export { router }
