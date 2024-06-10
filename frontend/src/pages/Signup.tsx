import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

const Signup = () => {
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
