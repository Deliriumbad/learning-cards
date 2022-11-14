import React from 'react';

import { FormikValues, useFormik } from 'formik';

import InputText from '../../components/InputText/InputText';

type Error = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

const validate = (values: FormikValues) => {
    const errors: Error = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length > 20) {
        errors.password = 'Must be 20 characters or less';
    }

    return errors;
};

const Registration = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            console.log(values);
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">
                E-mail
                <InputText
                    type="text"
                    id="email"
                    error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                    {...formik.getFieldProps('email')}
                />
            </label>

            {}

            <label htmlFor="password">
                Password
                <InputText
                    type="text"
                    id="password"
                    error={
                        formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : ''
                    }
                    {...formik.getFieldProps('password')}
                />
            </label>

            <button type="submit">Submit</button>
        </form>
    );
};

export default Registration;
