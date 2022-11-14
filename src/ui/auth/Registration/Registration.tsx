import React from 'react';

import { FormikValues, useFormik } from 'formik';

import registerApi from '../../../dal/registration-api';
import Button from '../../components/Button/Button';
import InputText from '../../components/InputText/InputText';

type Error = {
    email?: string;
    password?: string;
    confirmPassword?: string;
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
    } else if (values.password.length > 8) {
        errors.password = 'Must be 20 characters or less';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Password do`nt match';
    }

    return errors;
};

const Registration = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate,
        onSubmit: values => {
            registerApi.register({ email: values.email, password: values.password });
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

            <label htmlFor="confirmPassword">
                Confirm Password
                <InputText
                    type="text"
                    id="confirmPassword"
                    error={
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                            ? formik.errors.confirmPassword
                            : ''
                    }
                    {...formik.getFieldProps('confirmPassword')}
                />
            </label>

            <Button type="submit">Submit</Button>
        </form>
    );
};

export default Registration;
