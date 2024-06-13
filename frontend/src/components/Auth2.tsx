import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigninType } from "tiru_99-common";
import { signinInput } from "tiru_99-common";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "./Input";
export const Auth2 = () =>{

    const [postInput, setPostInput] = useState<SigninType>({
        email: "",
        password: ""
    });

   
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate(); 

    async function sendRequest(){

        if(postInput.password === null || postInput.email === null  ){
            //to check if the fields are null
            setError("Please fill all the fields");
            return ;
            
        }
    
        const validation = signinInput.safeParse(postInput);
        if (!validation.success && postInput.email !== null && postInput.password !== null) {
            //predefined zod schema validation
            setError("Please fill the inputs in proper format");
            return;
        }

        setIsLoading(true);  // Set loading state to true when the request starts
        
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInput);
           
            const jwt = response.data.jwt;  // Assuming the jwt is returned as part of the data
            localStorage.setItem("token", jwt);
            navigate('/blogs');
        } catch(e : any) {
            if (e.response) {
                // Server responded with an error status code
                if (e.response.status === 404) {
                    setError("User with this email is not registered");
                } else if(e.response.status == 403) {
                    setError("Incorrect Email or Password");
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

    return(
        
        <>
              <div className="h-screen flex justify-center items-center">
                <div className=" max-w-lg">     
                    <div className="text-4xl font-bold text-center mb-4">
                        Welcome Back 
                    </div>
                    <div className="text-l font-light text-slate-500 text-center mb-4">
                        Your First Time Here? <Link to="/signup"><u>Sign Up</u></Link>
                    </div>
                    <div className="space-y-4">
                      
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
                        
                        {/* Conditional rendering for Error  */}
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
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    
    )
}