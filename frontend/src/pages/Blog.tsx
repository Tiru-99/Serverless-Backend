import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";


const Blog = () =>{
    const { id } = useParams<{ id: string }>();
  const{loading , blog } = useBlog({
     id : id || ""
  }); 

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

    return<>
        <FullBlog blog={blog}/>
    </>
}

export default Blog; 