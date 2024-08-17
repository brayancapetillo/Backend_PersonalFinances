import express, { Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { conenv } from '@shared/config/config'
import user from '@presentation/routes/user.routes'

const app: Express = express()

// ?=== Settings ===?//
app.set('PORT', conenv.PORT)

// +=== Middlewares ===+//
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/user', user)

export default app
