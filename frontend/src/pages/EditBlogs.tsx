import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const EditBlogs = () => {
    const { id } = useParams();
    const {  blog } = useBlog({ id: id || "" });
    const [postInput, setPostInput] = useState({ id: "", title: "", content: "" });
    const [isLoading, setIsLoading] = useState(false); // State to track loading status
    const navigate = useNavigate(); 
    
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (blog) {
            setPostInput({ id: blog.id, title: blog.title, content: blog.content });
        }
    }, [blog]);

    async function updatePost() {
        if (postInput.title === "" || postInput.content === "") {
            setError("Please fill all the fields");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            setIsLoading(true); // Set loading to true when updating post
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.put(`${BACKEND_URL}/api/v1/blog`,  postInput , config);
            if (response) {
                setMessage("Blog updated successfully.");
            }

        } catch (error) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false); // Set loading to false after updating post
        }
    }

    

    return (
        <>
            <div>
                <Navbar />
                <div className="max-w-xl mx-auto mt-4 p-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={postInput.title}
                            className="block w-full p-2 mt-1 text-sm text-gray-900 bg-slate-100 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter the title of your blog"
                            onChange={(e) => {
                                setPostInput({ ...postInput, title: e.target.value });
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-900">Content</label>
                        <textarea
                            id="content"
                            value={postInput.content}
                            rows={6}
                            className="block w-full p-2 mt-1 text-sm text-gray-900 bg-slate-100 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your blog content here..."
                            onChange={(e) => {
                                setPostInput({ ...postInput, content: e.target.value });
                            }}
                        ></textarea>
                    </div>

                    {error && (
                        <div className="text-red-500 mt-3">{error}</div>
                    )}

                    <button
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={updatePost}
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? "Updating" : "Submit"} {/* Show loading text when loading */}
                    </button>
                </div>

                {message && (
                    <div className="text-green-500 flex justify-center mt-3">{message}</div>
                )}
            </div>
        </>
    );
}
