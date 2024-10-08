import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const MyForm = () => {
    const initialValues = { email: '', password: '' };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    });

    const handleSubmit = (values) => {
        console.log('Form data:', values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div>
                    <label>Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>
                <div>
                    <label>Password</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};
export default MyForm;