import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { JWTPayload } from 'hono/utils/jwt/types'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

type Environment = {
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId:JWTPayload[string]
  }
}

const app = new Hono<Environment>()
app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app
