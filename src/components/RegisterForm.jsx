import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterForm = ({ onSubmit }) => {
    const validationSchema = Yup.object({
        nom: Yup.string().required("Nom is required"),
        prenom: Yup.string().required("Prenom is required"),
        type: Yup.string().oneOf(["tailleur", "vendeur", "client"], "Invalid type").required("Type is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        passconfirm: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password confirmation is required"),
        telephone: Yup.string().required("Telephone is required"),
        mail: Yup.string().email("Invalid email address").required("Email is required"),
        image: Yup.string().required("Image URL is required"),
    });

    return (
        <Formik
            initialValues={{
                nom: "",
                prenom: "",
                type: "",
                password: "",
                passconfirm: "",
                telephone: "",
                mail: "",
                image: ""
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-row mb-3">
                        <div className="col">
                            <Field
                                type="text"
                                name="nom"
                                className="form-control"
                                placeholder="Nom"
                            />
                            <ErrorMessage name="nom" component="div" className="text-danger" />
                        </div>
                        <div className="col">
                            <Field
                                type="text"
                                name="prenom"
                                className="form-control"
                                placeholder="Prenom"
                            />
                            <ErrorMessage name="prenom" component="div" className="text-danger" />
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <Field
                            as="select"
                            name="type"
                            className="form-control"
                        >
                            <option value="">Select Type</option>
                            <option value="tailleur">Tailleur</option>
                            <option value="vendeur">Vendeur</option>
                            <option value="client">Client</option>
                        </Field>
                        <ErrorMessage name="type" component="div" className="text-danger" />
                    </div>

                    <div className="form-group mb-3">
                        <Field
                            type="text"
                            name="telephone"
                            className="form-control"
                            placeholder="Telephone"
                        />
                        <ErrorMessage name="telephone" component="div" className="text-danger" />
                    </div>

                    <div className="form-group mb-3">
                        <Field
                            type="email"
                            name="mail"
                            className="form-control"
                            placeholder="Email"
                        />
                        <ErrorMessage name="mail" component="div" className="text-danger" />
                    </div>

                    <div className="form-row mb-3">
                        <div className="col">
                            <Field
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                            />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="col">
                            <Field
                                type="password"
                                name="passconfirm"
                                className="form-control"
                                placeholder="Confirm Password"
                            />
                            <ErrorMessage name="passconfirm" component="div" className="text-danger" />
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <Field
                            type="text"
                            name="image"
                            className="form-control"
                            placeholder="Image URL"
                        />
                        <ErrorMessage name="image" component="div" className="text-danger" />
                    </div>

                    {/*<div className="form-check mb-3">*/}
                    {/*    <Field type="checkbox" name="" className="form-check-input" />*/}
                    {/*    <label className="form-check-label" htmlFor="terms">*/}
                    {/*        Accept Terms and Conditions*/}
                    {/*    </label>*/}
                    {/*    <ErrorMessage name="terms" component="div" className="text-danger" />*/}
                    {/*</div>*/}

                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                        Register
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
