import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@lucky452/medium-blog-common";

type Environment = {
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
    Variables: {
        userId: string
    }
}

export const blogRouter = new Hono<Environment>()

/*
Midddleware for user user authentication using authorization header
*/
blogRouter.use("/*", async (c, next) => {
    const auth_header = c.req.header("Authorization") || ""
    const token = auth_header.split(" ")[1]

    try {
        const payload = await verify(token, c.env.JWT_SECRET)
        c.set("userId", String(payload.id))
        await next()
    } catch (e) {
        c.status(403)
        return c.json({
            "error": "Unauthorized"
        })
    }
})

/* 
Create Blog
*/

blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        "datasourceUrl": c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const { success } = createBlogInput.safeParse(body)

        if (!success) {
            c.status(411)
            return c.json({
                "error": "Invalid Input"
            })
        }

        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })

        return c.json({
            id: blog.id
        })
    } catch (e) {
        c.status(411)
        return c.json({
            "message": "Something went wrong."
        })
    }

})

/* 
Edit Blog
*/

blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        "datasourceUrl": c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const { success } = updateBlogInput.safeParse(body)

        if (!success) {
            c.status(411)
            return c.json({
                "error": "Invalid Input"
            })
        }

        const blog = await prisma.blog.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json({
            id: blog.id
        })
    } catch (e) {
        c.status(411)
        return c.json({
            "message": "Something went wrong."
        })
    }
})

/* 
Get all Blog titles
*/

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        "datasourceUrl": c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select: {
                        name:true
                    }
                }
            }
        })

        return c.json({ "blogs": blogs })
    } catch (e) {
        c.status(411)
        return c.json({
            "message": "Something went wrong."
        })
    }
})

/* 
Get Blog with certain id
*/

blogRouter.get('/:id', async (c) => {
    const id = await c.req.param("id")
    const prisma = new PrismaClient({
        "datasourceUrl": c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            },
            where: {
                id: id,
            }
        })

        return c.json({
            "blog": blog
        })
    } catch (e) {
        c.status(411)
        return c.json({
            "message": "Something went wrong."
        })
    }
})


