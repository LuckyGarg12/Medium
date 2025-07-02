import { Hono } from 'hono'
import { JWTPayload } from 'hono/utils/jwt/types'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

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

app.use("*", cors())

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app
