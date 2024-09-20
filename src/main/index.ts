/**
 * @file index.ts
 * @description Entry point of the application that initializes and starts the server.
 * It listens on a specified port and logs a message to the console once the server is running.
 * @module Main
 */

// -Library and tool imports
import chalk from 'chalk'
import app from './app'

/**
 * Main function to start the server.
 * It listens on the port defined in the application configuration
 * and logs the server status to the console.
 */
const main = (): void => {
  // Start the server and listen on the specified PORT
  app.listen(app.get('PORT'))

  console.log((chalk.hex('#464998').bold('Server Running On Port') + chalk.hex('#464998').bold(' ⪢ ⪢ ⪢ ⪢ ⪢ ') + chalk.hex('#25e49b').bold(app.get('PORT') + chalk.hex('#464998').bold(' ⪡ ⪡ ⪡ ⪡ ⪡'))))
}

// Invoke the main function to start the application
main()
