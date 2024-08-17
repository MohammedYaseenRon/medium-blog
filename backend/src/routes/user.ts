import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import z from "zod";
import { signupInput,signinInput } from "@yaseenron/medium-common";


export const userRouter = new Hono<{  
    // Create the main Hono app
       //whenever definig hone pass that specifc as generic here
    Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string,
	}
}>();





userRouter.post('/signup', async (c) => { //context =c it holds req,res,next
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            },
        });
        const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
        return c.json(jwt)

    } catch(e) {
        console.log(e);
        c.status(411);
        return c.json("Invalid");
            
    }
})  



  


userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  
  
  try{
    const user = await prisma.user.findFirst({
        where: {
            username:body.username,
            password:body.password,
          },
    });
  
    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }
  
    const jwt = await sign({ id: user.id    }, c.env.JWT_SECRET);
    return c.json({ jwt });

  }catch(e) {
    c.status(411);
    return c.json("Invalid")

  }
  
  
})