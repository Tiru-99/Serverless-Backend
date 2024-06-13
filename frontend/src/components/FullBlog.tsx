
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { Navbar } from "./Navbar";


//page for viewing a complete blog
export const FullBlog = ({ blog }: { blog: Blog }) => {

    return (
        <>
            <div>
                <Navbar />
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-10 w-full pt-12 max-w-screen-xl">
                        <div className="md:col-span-8">
                            <div className="text-5xl font-extrabold">
                                {blog.title}
                            </div>
                            <div className="text-slate-500 pt-4">
                                Posted on {blog.publishedDate}
                            </div>
                            <div className="pt-4">
                                {blog.content}
                            </div>
                        </div>
                        <div className="md:col-span-4 mt-8 md:mt-0">
                            <div className="font-bold mb-2">Author</div>
                            <div className="flex md:flex justify-center items-center md:items-start">
                                <div className='md:mt-1'>
                                <Avatar name={blog.author.name || "Anonymous"}  />
                                </div>
                                <div className="ml-4  md:ml-4">
                                    <div className="font-semibold">
                                        {blog.author.name || "Anonymous"}
                                    </div>
                                    <div className="text-slate-500 text-sm">
                                        Random catch phrase about the author's ability to grab user's attention
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        
        </>
    );
};
