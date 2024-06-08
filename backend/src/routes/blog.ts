import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { jwt } from 'hono/jwt';
import { verify as verifyToken } from 'hono/jwt';



export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };

  Variables: {
    userId: string;
  };
}>();


// Middleware to check JWT and set userId
  blogRouter.use(async (c, next) => {
    //variable to get the header request
    const header = c.req.header('Authorization');

    if (!header) {
        c.status(403);
        return c.json({ msg: 'Unauthorized' });
    }
    //Bearer Token => ['Bearer', 'Token']
    const token = header.split(' ')[1];

  try {
    //verfication of the jwt token
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    
    if (!payload) {
      c.status(401);
      return c.json({ msg: 'Unauthorized' });
    }
    
    //extracting id and passing it to userId variable
    (c as any).userId = payload.id;
    
  } catch (e) {
    console.log("Error during token verification:", e);
    c.status(401);
    return c.json({ msg: 'Unauthorized' });
  }

  await next();
});

// Route to create a new blog post
blogRouter.post('/', async (c) => {
  const userId = (c as any).userId;

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //to get the body 
  const body = await c.req.json();

 
  try {
    //prisma to create a new post
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    
    c.status(200);
    return c.json({
      id: post.id,
      msg: 'Post created successfully',
    });
  } catch (e) {
    console.log("Error during post creation:", e);
    c.status(500);
    return c.json({ msg: 'Internal server error' });
  }
});

//route to update the post 
blogRouter.put('/' , async(c)=>{
    const userId = (c as any).userId;

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
    // to get the body
    const body = await c.req.json();

    try{
       //to update data
       await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        c.status(200);
        return c.json({
            "msg":"Post updated successfully"
        });

    } catch(e){
        console.log("Something went wrong while updating the post :::" , e);
    }
});

//route to get the specific post
blogRouter.get('/:id', async (c) => {
  //query is like id:? then route 
  //param is like direct value
  // Accessing id as a route parameter
  const id = c.req.param('id'); 
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    console.log(id); 
    //trying to get post of the current id
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return c.json(post);
  } catch (e) {
    console.log("Something went wrong :::", e);
  }
});

//route to get all the posts from an author
blogRouter.get('/bulk/:userId', async (c) => {
  const userId = c.req.param('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    //finding posts through userId and authorId
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId, 
      },

      // include:{
      //   author : true
      // } this part defines author information
    });
    return c.json({ posts });
  } catch (e) {
    console.log("There is something wrong :::", e);
  }
});

