import { Quote } from "../components/Quote";
import {Auth2} from "../components/Auth2"

const Signin = () =>{
    // const token = localStorage.getItem('token');
    // const navigate = useNavigate(); 
    // if(token){
    //     navigate('/blogs')
    //     return ; 
    // }
    return(
        <>
            <div className="md:flex flex-row">
                    <div className="flex-1">
                    <Auth2 />
                    </div>
                    <div className="flex-1 flex-col-1">
                        <Quote />
                    </div>
            </div>
        </>
    )
}

export default Signin; 