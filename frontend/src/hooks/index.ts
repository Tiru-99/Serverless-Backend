import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Blog from "../pages/Blog";

export interface Blog {
    id: string;
    title: string ;
    content: string ;
    authorId ?: string;
    publishedDate : string,
    author: {
        name: string ;
    };
}

const initialBlog: Blog = {
    id: '',
    title: '',
    content: '',
    authorId:'',
    publishedDate:'',
    author: {
      name: ''
    }
  };



  export const usePosted = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [postedBlog, setPostedBlog] = useState<Blog[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostedBlogs = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("You need to be logged in first");
                navigate('/signin');
                return;
            }

            // Configure the request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk/${id}`, config);
                if ((response.data)) {
                    setPostedBlog(response.data.posts);
                    console.log(response.data)
                } else {
                    console.error('Unexpected response format:', response.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchPostedBlogs();
    }, [id, navigate]);

    return {
        loading,
        postedBlog,
    };
};

export const useBlog = ({id} : {id : string}) =>{
    const[loading , setLoading] = useState(true);
    const[blog , setBlog] = useState<Blog>( initialBlog );
    const navigate = useNavigate(); 

    useEffect(() =>{
        const token = localStorage.getItem('token');
        if(!token || token == null){
            alert("you need to be logged in first");
            navigate('/signin')
            return; 
        }


         // Configure the request headers
        const config = {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        };

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , config)
        .then(response => {
            setBlog(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
            setLoading(false);
          });
  
    },[])

    return{
        loading , 
        blog
    }

}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate(); 


  useEffect(() => {
    // Retrieve the JWT token from local storage or session storage
    const token = localStorage.getItem('token'); // Or use sessionStorage.getItem('jwtToken');
    console.log("this is the token" , token);

    if(!token || token == null){
        alert("you need to be logged in first");
        navigate('/signin')
        return; 
    }

    // Configure the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get(`${BACKEND_URL}/api/v1/blog/get/many`, config)
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  console.log(blogs);

  return {
    loading,
    blogs,
  };
};
