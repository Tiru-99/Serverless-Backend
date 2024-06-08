import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign , verify} from 'hono/jwt'

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

  try{

    const existingUser = await prisma.user.findUnique({
      where:{
        email : body.email
      }
    })

    if(existingUser){
      return c.json({
        "msg":"User already exists"
      })
    }

    else{
    const user = await prisma.user.create({
      data :{
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

  const user = await prisma.user.findUnique({
    where:{
      email : body.email, 
      password : body.password,
    }
  });

  if(!user){
    return c.json({
      "msg" : "User not found"
    })
  }

  const jwt = await sign({id:user.id } , c.env.JWT_SECRET);
  return c.json({
    "jwt":jwt
  });

})



