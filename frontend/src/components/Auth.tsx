import { Input } from "./Input";
import { useState } from "react";
import { SignupType , signupInput} from "tiru_99-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";


export const Auth = () => {
    const [postInput, setPostInput] = useState<SignupType>({
        name: "",
        password: "",
        email: ""
    });

    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate(); 

    async function sendRequest(){

        const validation = signupInput.safeParse(postInput);
        if (!validation.success) {
            setError("Please fill the inputs in proper format");
            return;
        }


        if(postInput.password == null || postInput.email == null || postInput.password == null || confirmPassword == null){
            setError("Please fill all the fields");
            return ;
            
        }

        if (postInput.password !== confirmPassword) {
            setError("Your Password and Confirm Passwords do not match");
            
            return;
        }

        setIsLoading(true);  // Set loading state to true when the request starts
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInput);
           
            const jwt = response.data.jwt;  // Assuming the jwt is returned as part of the data
            localStorage.setItem("token", jwt);
            navigate('/blogs');
        } catch(e : any) {
            if (e.response) {
                // Server responded with an error status code
                if (e.response.status === 409) {
                    setError("User with this email already exists");
                } else {
                    setError("Something went wrong with the server");
                }
            } else if (e.request) {
                // The request was made but no response was received
                setError("No response from the server");
            } else {
                // Something happened in setting up the request that triggered an error
                setError("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);  // Set loading state to false after the request completes
        }
    }

    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div className=" max-w-lg">     
                    <div className="text-4xl font-bold text-center mb-4">
                        Create An Account
                    </div>
                    <div className="text-l font-light text-slate-500 text-center mb-4">
                        Already have an account? <Link to="/signin"><u>Login</u></Link>
                    </div>

                    <div className="space-y-4">
                        <Input 
                            label="Username" 
                            type="text" 
                            placeholder="Enter Username" 
                            onChange={(e) => {
                                setPostInput({
                                    ...postInput,
                                    name: e.target.value,
                                });
                            }}
                        />

                        <Input 
                            label="Email" 
                            type="text" 
                            placeholder="Enter Email" 
                            onChange={(e) => {
                                setPostInput({
                                    ...postInput,
                                    email: e.target.value,
                                });
                            }}
                        />

                        <Input 
                            label="Password" 
                            type="password" 
                            placeholder="Enter Password" 
                            onChange={(e) => {
                                setPostInput({
                                    ...postInput,
                                    password: e.target.value,
                                });
                            }}
                        />

                        <Input 
                            label="Confirm Password" 
                            type="password" 
                            placeholder="Confirm Password" 
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />

                        {error && (
                            <div className="text-red-500 mt-3 text-wrap">{error}</div>
                        )}

                        <div className="">
                            <button
                                type="button"
                                className={`text-white font-medium rounded-md text-sm px-5 py-2.5 w-full mt-4 ${isLoading ? 'bg-gray-500' : 'bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'}`}
                                onClick={sendRequest}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                    </svg>
                                ) : (
                                    'Sign Up'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
