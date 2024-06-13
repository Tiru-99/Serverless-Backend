import {z} from 'zod';

export const signupInput = z.object({
    email : z.string().email(),
    password : z.string(),
    name : z.string()
})

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string(),
});

export type SigninType = z.infer<typeof signinInput>

export const createPostType = z.object({
    title : z.string(),
    content : z.string()
})

export type CreatePostType = z.infer<typeof createPostType>;

export const updatePostType = z.object({
    id : z.string(),
    title : z.string().optional(),
    content : z.string().optional()
})

export type UpdatePostType = z.infer<typeof updatePostType>;