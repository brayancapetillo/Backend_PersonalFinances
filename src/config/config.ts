import { config } from "dotenv"
config()

export const conenv = {
    PORT: process.env.PORT
} as const;