/**
 * @file app.ts
 * @description Main Express application setup. This file configures middleware,
 * settings, and routes for the application.
 * @module App
 */
// -Library and tool imports
import express, { Express } from 'express'
import passport from 'passport'
import morgan from 'morgan'
import cors from 'cors'

import { conenv } from '@shared/config/config'
import { router } from '@presentation/routes'
import { jwtStrategy } from '@shared/config/passport'

const app: Express = express()

// ?=== Settings ===?//
app.set('PORT', conenv.PORT)

// +=== Middlewares ===+//
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())

// +=== Passport ===+//
passport.use(jwtStrategy)

app.use(router)

// Export the configured Express application
export default app
