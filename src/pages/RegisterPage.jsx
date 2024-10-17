import React from 'react';
import NavHeader2 from "../components/NavBar2";
import RegisterForm from "../components/RegisterForm";
import {useLocation, useNavigate} from "react-router-dom";
import useSave from "../backend/Services/useSave.js";
import registerBg from "../images/login-bg-2.jpg";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { saveData, isSaving, saveError } = useSave();

    const register = async (credentials) => {
        try {
            console.log(credentials)
            const data = await saveData('users/create', credentials);
            const from = location.state?.from?.pathname || '/login';
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Registration failed:', error);
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
                                    Create <br /> your account
                                </h2>
                                {saveError && <p className="text-danger">{saveError}</p>}
                                {isSaving ? (
                                    <p>Registering...</p>
                                ) : (
                                    <RegisterForm onSubmit={register} />
                                )}
                                <div className="text-center mt-3">
                                    <p>Already have an account?</p>
                                    <a href="/login" className="text-primary">
                                        Login here
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
