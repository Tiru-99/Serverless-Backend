import { useParams } from "react-router-dom"
import { usePosted } from "../hooks"
import { BlogCard } from "../components/BlogCard";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

export const PostedBlogs = () =>{
    const{id} = useParams(); 
    const{loading ,postedBlog } = usePosted({
        id : id || ""
    });

    if (loading) {
        return (
          
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
            </div>
          
        );
      }

    if(!postedBlog || postedBlog.length == 0){
      return(
        <>
        <Navbar/>
        <div className="mt-32">
          <div className="text-3xl font-normal flex justify-center text-center">You currently have no posts published!</div>
          <div className="flex justify-center">
          <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
           font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8 ml-3 dark:bg-green-600
            dark:hover:bg-green-700 dark:focus:ring-green-800">Publish Now !</button>
            </div>
        </div>
        
        </>
      )
    }

    return(
        
        <>
        <Navbar></Navbar>
      <div className="mx-auto max-w-2xl">
        
        {postedBlog.slice().reverse().map((blog) => (
          <div key={blog.id}>
          <Link to={`/blog/${blog.id}`} >
            <BlogCard
              authorName={blog.author.name || "Anonymous"}
              publishedDate={blog.publishedDate }
              title={blog.title}
              content={blog.content}>
            </BlogCard>
          </Link>

          <Link to={`/edit/${blog.id}`}>
          <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300
           font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-3 ml-3 dark:bg-green-600
            dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
          </Link>
          </div>
          
        ))}
        
      </div>
        </>
    )
}