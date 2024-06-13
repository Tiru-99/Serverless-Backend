import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import { useNavigate } from "react-router-dom";


const Signup = () => {
 

const navigate = useNavigate();
const token = localStorage.getItem('token');

if(token){
    navigate('/blogs');
}

  // Render the sign-up form only if the user is not logged in
  return (
    <>
      <div className="md:flex flex-row">
        <div className="flex-1">
          <Auth />
        </div>
        <div className="flex-1 flex-col-1">
          <Quote />
        </div>
      </div>
    </>
  );
}

export default Signup;
