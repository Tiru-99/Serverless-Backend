
import { Link, useNavigate } from "react-router-dom";
import { ReqButton } from "./ReqButton";

 // Import jwt-decode library

export const Navbar = () => {
    const navigate = useNavigate();

    // Function to logout user
    async function logOut() {
        localStorage.removeItem('token');
        alert("You have been logged out successfully. Redirecting to the signin page...");
        navigate('/signin');
    }

    // Get user's name from the token
  

    return (
        <>
             <div className="flex justify-between items-center border-b px-4 sm:px-6 py-4">
                <div className="text-xl sm:text-2xl font-bold">Medium</div>

                <div className="flex items-center space-x-4">
                    <Link to="/publish" className="text-gray-800 hover:text-blue-600 transition duration-300">
                        Publish
                    </Link>
                    <ReqButton />
                    <button onClick={logOut} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};
