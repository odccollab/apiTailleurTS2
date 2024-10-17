import {useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useSave from "../backend/Services/useSave";
import LoginForm from "../components/LoginForm";
import NavHeader2 from "../components/NavBar2";
import SocialLogin from "../components/SocialLogin.jsx";
import registerBg from "../images/ImagesLog.png";

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { saveData, isSaving, saveError } = useSave(); // Use the custom hook
    const handleLogin = async (credentials) => {

        try {
            const data = await saveData('users/login2', credentials);
                login(data.token);

            // Redirect to the page they tried to visit or home
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <NavHeader2 />
            <div className="main-wrap">
                <div className="row">
                    <div
                        className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{ backgroundImage: `url(${registerBg})` }}
                    />
                    <div className="col-xl-7 vh-100 d-flex align-items-center bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 mx-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-3">
                                    Login into <br /> your account
                                </h2>
                                <LoginForm onSubmit={handleLogin} />
                                {isSaving && <p>Logging in...</p>}
                                {saveError && <p className="text-danger">Error: {saveError}</p>}
                            </div>
                <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
