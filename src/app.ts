import express, { Express } from "express"
import morgan from "morgan"
import cors from "cors"
import { conenv } from "./config/config";

const app: Express = express();

//?=== Settings ===?//
app.set('PORT', conenv.PORT || 3000)

//+=== Middlewares ===+//
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


export default app;