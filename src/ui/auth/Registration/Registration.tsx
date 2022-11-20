import React from 'react';

import { requestRegistration } from 'bll/reducers/register-reducer';
import { useAppDispatch } from 'bll/store/hooks';
import { FormikValues, useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'ui/components/Button/Button';
import InputText from 'ui/components/InputText/InputText';

import { PATH } from '../../../utils/Routes/RoutesPath';

import s from './Registration.module.scss';

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
        errors.password = 'Must be 8 characters or less';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Password do`nt match';
    }

    return errors;
};

const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate,
        onSubmit: values => {
            dispatch(requestRegistration({ email: values.email, password: values.password }));
            navigate(PATH.login);
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={s.form}>
            <div className={s.title}>Sign Up</div>
            <div className={s.inputGroup}>
                <InputText
                    type="text"
                    id="email"
                    placeholder=" "
                    {...formik.getFieldProps('email')}
                />
                <label htmlFor="email">E-mail</label>
                {formik.errors.email && formik.touched.email && (
                    <div className={s.error}>{formik.errors.email}</div>
                )}
            </div>
            <div className={s.inputGroup}>
                <InputText
                    type="text"
                    id="password"
                    placeholder=" "
                    {...formik.getFieldProps('password')}
                />
                <label htmlFor="password">Password</label>
                {formik.errors.password && formik.touched.password && (
                    <div className={s.error}>{formik.errors.password}</div>
                )}
            </div>
            <div className={s.inputGroup}>
                <InputText
                    type="text"
                    id="confirmPassword"
                    placeholder=" "
                    {...formik.getFieldProps('confirmPassword')}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className={s.error}>{formik.errors.confirmPassword}</div>
                )}
            </div>
            <Button type="submit" className={s.button}>
                Sign Up
            </Button>
            <div className={s.message}>Already have an account?</div>
            <NavLink to={PATH.login} className={s.signIn}>
                Sign In
            </NavLink>
        </form>
    );
};

export default Registration;
