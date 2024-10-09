export const RegisterForm = () => {
    return (
        <form>
            <div className="form-group icon-input mb-3">
                <i className="font-sm ti-user text-grey-500 pe-0"></i>
                <input
                    type="text"
                    className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                    placeholder="Your Name"
                />
            </div>
            <div className="form-group icon-input mb-3">
                <i className="font-sm ti-email text-grey-500 pe-0"></i>
                <input
                    type="text"
                    className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                    placeholder="Your Email Address"
                />
            </div>
            <div className="form-group icon-input mb-3">
                <input
                    type="Password"
                    className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                    placeholder="Password"
                />
                <i className="font-sm ti-lock text-grey-500 pe-0"></i>
            </div>
            <div className="form-group icon-input mb-1">
                <input
                    type="Password"
                    className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                    placeholder="Confirm Password"
                />
                <i className="font-sm ti-lock text-grey-500 pe-0"></i>
            </div>
            <div className="form-check text-left mb-3">
                <input type="checkbox" className="form-check-input mt-2" id="exampleCheck3" />
                <label className="form-check-label font-xsss text-grey-500" htmlFor="exampleCheck3">
                    Accept Term and Conditions
                </label>
            </div>
        </form>
    );
};
export default RegisterForm