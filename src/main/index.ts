import chalk from 'chalk'
import app from './app'

const main = (): void => {
  app.listen(app.get('PORT'))

  console.log((chalk.hex('#464998').bold('Server Running On Port') + chalk.hex('#464998').bold(' ⪢ ⪢ ⪢ ⪢ ⪢ ') + chalk.hex('#25e49b').bold(app.get('PORT') + chalk.hex('#464998').bold(' ⪡ ⪡ ⪡ ⪡ ⪡'))))
}

main()
