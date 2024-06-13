import { Link, useNavigate, useLocation } from "react-router-dom";
import { ReqButton } from "./ReqButton";


export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Function to logout user
    async function logOut() {
        localStorage.removeItem('token');
        alert("You have been logged out successfully. Redirecting to the signin page...");
        navigate('/signin');
    }

    


    return (
        <>
            <div className="flex justify-between items-center border-b px-4 sm:px-6 py-4">
                <div className="text-xl sm:text-2xl font-bold">SleekPost</div>

                <div className="flex items-center  ml-2 text-xs sm:text-lg">
                    <div className="p-2 ">
                    {location.pathname !== "/publish" && (
                        <Link to="/publish" className="text-gray-800 hover:text-blue-600 transition duration-300">
                            Publish
                        </Link>
                    )}
                    </div>

                    <div className="p-2 sm:mr-2">
                    <ReqButton/>
                    </div>
                   
                    <button onClick={logOut} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};
