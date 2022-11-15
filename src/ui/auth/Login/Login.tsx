import React from 'react';

import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { PATH } from '../../../utils/Routes/RoutesPath';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/CheckBox/Checkbox';
import InputText from '../../components/InputText/InputText';

//  import { FormikValues, useFormik } from 'formik';

//  import { useAppDispatch } from '../../../bll/store/hooks';

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

const Login = () => {
    //  const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.trim().length < 3) {
                errors.password = 'Min 3 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">
                E-mail
                <InputText type="email" id="email" />
            </label>
            <label htmlFor="password">
                Password
                <InputText type="password" id="password" />
            </label>
            <label>
                <Checkbox />
                Remember me
                <NavLink to={PATH.passwordRecovery}>Forget password?</NavLink>
            </label>
            <Button type="submit">Login</Button>
            <NavLink to={PATH.registration}>Sign Up</NavLink>
        </form>
    );
};

export default Login;
