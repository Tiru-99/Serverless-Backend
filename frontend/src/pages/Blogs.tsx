import { BlogCard } from "../components/BlogCard";
import { Navbar } from "../components/Navbar";
import { useBlogs } from "../hooks";
import { Link } from "react-router-dom";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl">
        {blogs.slice().reverse().map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <BlogCard
              authorName={blog.author.name || "Anonymous"}
              publishedDate={blog.publishedDate || "9/11"}
              title={blog.title}
              content={blog.content}
            />
          </Link>
        ))}
      </div>
    </>
  );
};
