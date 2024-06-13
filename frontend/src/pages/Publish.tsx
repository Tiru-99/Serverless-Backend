import { Navbar } from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CreatePostType, createPostType } from "tiru_99-common";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [blogInput, setBlogInput] = useState<CreatePostType>({
        title: "",
        content: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State to track loading status
    const navigate = useNavigate();

    async function publishPost() {
        const validation = createPostType.safeParse(blogInput);
        if (!validation.success) {
            setError("Please fill the inputs in proper format");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            setIsLoading(true); // Set loading to true when publishing

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, { title: blogInput.title, content: blogInput.content }, config);
            if (response.status === 200) {
                setMessage("Blog post published successfully.");
            }
        } catch (error) {
            setError("Something went wrong");
            return;
        } finally {
            setIsLoading(false); // Set loading to false after publishing
        }
    }

    return (
        <div>
            <Navbar />

            <div className="max-w-xl mx-auto mt-4 p-4">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={blogInput.title}
                        onChange={(e) => {
                            setBlogInput({
                                ...blogInput,
                                title: e.target.value
                            });
                        }}
                        className="block w-full p-2 mt-1 text-sm text-gray-900 bg-slate-100 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the title of your blog"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-900">Content</label>
                    <textarea
                        id="content"
                        value={blogInput.content}
                        onChange={(e) => {
                            setBlogInput({
                                ...blogInput,
                                content: e.target.value
                            })
                        }}
                        rows={6}
                        className="block w-full p-2 mt-1 text-sm text-gray-900 bg-slate-100 rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write your blog content here..."
                    ></textarea>
                </div>

                {error && (
                    <div className="text-red-500 mt-3">{error}</div>
                )}

                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={publishPost}
                    disabled={isLoading} // Disable button when loading
                >
                    {isLoading ? "Publishing..." : "Submit"} {/* Show loading text when loading */}
                </button>
            </div>

            {message && !error && (
                <div className="text-green-500 mt-3 justify-center flex">{message}</div>
            )}
        </div>
    );
};
