import React from 'react';

import { requestRegistration } from 'bll/reducers/register-reducer';
import { useAppSelector, useAppDispatch } from 'bll/store/hooks';
import { FormikValues, useFormik } from 'formik';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'ui/common/Button/Button';
import InputText from 'ui/common/InputText/InputText';

import { PATH } from '../../../../routes/RoutesPath';

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
    const error = useAppSelector(state => state.register.emailError);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
        <div className={s.container}>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <div className={s.title}>Sign Up</div>
                <div className={s.inputGroup}>
                    <InputText
                        type="text"
                        id="email"
                        placeholder=" "
                        {...formik.getFieldProps('email')}
                    />
                    <label htmlFor="email">Email</label>
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
                    {error && <div className={s.errorResponse}>{error}</div>}
                </div>
                <Button type="submit" className={s.button}>
                    Sign Up
                </Button>
                <div className={s.message}>Already have an account?</div>
                <NavLink to={PATH.login} className={s.signIn}>
                    Sign In
                </NavLink>
            </form>
        </div>
    );
};

export default Registration;
