import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
//importing deployed librar
import { signinInput , signupInput ,SignupType} from 'tiru_99-common'
import { parse } from 'hono/utils/cookie'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET : string
  
  }
}>()

// userRouter.use('/api/v1/blog/*', async(c,next)=>{
//   //get the authorization header
//   const header = c.req.header("authorization") || ""

//   //Bearer token => ["Bearer" , "Token"]
//   //as we provide token as Bearer then auth token
//   const token = header.split(" ")[1];

//   if(!header){
//     return c.json({
//       msg : "no header found"
//     })
//   }
//   //verify the authorization header 
//   const response  = await verify(header, c.env.JWT_SECRET)
//   if(response.id){
//     next();
//   }
//   else{
//     return c.json({
//       msg:"unauthorized error"
//     })
//   }
//   //if header is correct, we can proceed 
//   //if not , we return a status code of 403
// })



userRouter.post('/signup' , async(c)=>{

  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

  const body = await c.req.json(); 

  //zod validation
  const parseResult = signupInput.safeParse(body);
  if (!parseResult.success) {
      c.status(400);
      return c.json({
          "error": "Please enter inputs in correct formats",
      });
  }

  try{

    const existingUser = await prisma.user.findUnique({
      where:{
        email : body.email
      }
    })

    if(existingUser){
      c.status(409);
      return c.json({
        "msg":"User already exists"
      })
    }

    else{
    const user = await prisma.user.create({
      data :{
        name : body.name,
        email : body.email,
        password : body.password
      }
    });
    
    console.log("user created successfully");
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt : jwt});

    
  }
 } catch(e){
    console.log("There is something really wrong", e);
  }

});

userRouter.post('/signin',async(c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

  const body = await c.req.json(); 

  //zod validation
  const parseResult = signinInput.safeParse(body);
  if(!parseResult.success){
    c.status(400);
    return c.json({
      "error":"Please enter correct inputs in proper format"
    });
  }

  const user = await prisma.user.findUnique({
    where:{
      email : body.email,      
    }
  });


  if(!user){
    c.status(404);
    return c.json({
      "msg" : "User not found"
    })
  }

  if(body.password !== user.password){
    c.status(403);
    return c.json({
      "msg": "Incorrect Password or Email"
    })
  }

  const jwt = await sign({id:user.id } , c.env.JWT_SECRET);
  c.status(200);
  return c.json({
    "jwt":jwt
  });

})



