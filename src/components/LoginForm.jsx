import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm = ({ onSubmit }) => {
    const validationSchema = Yup.object({
        mail: Yup.string()
            .email('Please enter a valid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    return (
        <Formik
            initialValues={{ mail: '', password: '', rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group icon-input mb-3">
                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                        <Field
                            type="text"
                            name="mail"
                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                            placeholder="Your Email Address"
                        />
                        <ErrorMessage name="mail" component="div" className="text-danger" />
                    </div>
                    <div className="form-group icon-input mb-1">
                        <Field
                            type="password"
                            name="password"
                            className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                            placeholder="Password"
                        />
                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                        <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <div className="form-check text-left mb-3">
                        <Field
                            type="checkbox"
                            name="rememberMe"
                            className="form-check-input mt-2"
                            id="exampleCheck5"
                        />
                        <label className="form-check-label font-xsss text-grey-500" htmlFor="exampleCheck5">
                            Remember me
                        </label>
                        <a href="/forgot-password" className="fw-600 font-xsss text-grey-700 mt-1 float-right">
                            Forgot your Password?
                        </a>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
