import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@lucky452/medium-blog-common";

type Environment = {
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}

export const userRouter = new Hono<Environment>()

/*
Signup Route
*/
userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  try {
    const { success } = signupInput.safeParse(body)

    if (!success) {
      c.status(411)
      return c.json({
        "error": "Invalid Input"
      })
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({
      jwt: token,
      username: user.name
    })
  }
  catch (e) {
    console.log(e)
    c.status(403)
    return c.json({
      "error": "User already exists"
    })
  }

})


/*
Signin Route
*/

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()

  try {
    const {success} = signinInput.safeParse(body)

    if (!success) {
      c.status(411)
      return c.json({
        "error": "Invalid Input"
      })
    }

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        name: true
      },
      where: {
        email: body.email,
        password: body.password
      }
    })

    if (!user) {
      c.status(403)
      return c.json({ error: "Invalid email or password" })
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({ 
      jwt: token,
      username: user.name
    })
  }
  catch (e) {
    console.log(e)
    c.status(411)
    return c.text("Something went wrong.")
  }
})