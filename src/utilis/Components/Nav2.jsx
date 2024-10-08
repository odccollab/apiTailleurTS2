import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../Services/UserContext.jsx";

const Navbar2 = () => {
    const { user } = useContext(UserContext);

    return (
        <nav>

            <div className="user-info">
                {user.firstName && user.lastName ? (
                    <p>{`Bonjour, ${user.firstName} ${user.lastName}`}</p>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar2;