import { Router } from 'express'
import { readdirSync } from 'fs'

const pathRouter = `${__dirname}`

const router = Router()

const cleanFileName = (fileName: string): string => { return fileName.split('.').shift() ?? '' }

readdirSync(pathRouter).filter((fileName: string) => {
  const name: string = cleanFileName(fileName)

  if (name !== 'index') {
    void import(`./${name}.routes`).then((moduleRouter) => {
      router.use(`/_api/v/${name}`, moduleRouter.router)
    })
    return true
  }
  return false
})

export { router }
