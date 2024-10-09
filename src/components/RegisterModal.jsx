import SocialLogin from "./SocialLogin.jsx";
import RegisterForm from "./RegisterForm.jsx";

export const RegisterModal = () => {
    return (
        <div
            className="modal bottom fade "
            id="Modalregister"
            tabIndex="-1"
            aria-labelledby="registerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0">
                    <button
                        type="button"
                        className="close position-absolute end-0 p-3"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        <i className="ti-close text-grey-500"></i>
                    </button>
                    <div className="modal-body p-3 d-flex align-items-center">
                        <div className="card shadow-none rounded-0 w-100 p-2 pt-3 border-0">
                            <div className="card-body rounded-0 text-left p-3">
                                <h2 className="fw-700 display1-size display2-md-size mb-4">
                                    Create <br />your account
                                </h2>
                                <RegisterForm />
                                <div className="col-sm-12 p-0 text-left">
                                    <div className="form-group mb-1">
                                        <a href="#" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0">
                                            Register
                                        </a>
                                    </div>
                                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                                        Already have account <a href="#" data-bs-toggle="modal" data-bs-target="#Modallogin" className="fw-700 ms-1">Login</a>
                                    </h6>
                                </div>
                                <SocialLogin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal