import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export const ReqButton = () => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log("No token found");
                    return;
                }
                
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/get/userId`, config);
                if (response.status !== 200) {
                    console.log("There is some error");
                    return;
                } else {
                    setUserId(response.data.userId);
                    console.log(response.data.userId); // Log the correct value here
                }
            } catch (e) {
                console.log("something went wrong", e);
            }
        };

        fetchUserId();
    }, []); // Empty dependency array to run only once on mount

    return (
        <>
            <Link to={`/publishedpost/${userId}`}>
                <div>
                    <button>Get your posts</button>
                </div>
            </Link>
        </>
    );
};
