import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { requestLogin } from '../../../../bll/reducers/login-reducer';
import { useAppDispatch, useAppSelector } from '../../../../bll/store/hooks';
import { PATH } from '../../../../routes/RoutesPath';
import Button from '../../../common/Button/Button';
import Checkbox from '../../../common/CheckBox/Checkbox';
import InputText from '../../../common/InputText/InputText';
import Preloader from '../../../common/Preloader/Preloader';

import s from './Login.module.scss';

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

const Login = () => {
    const isFetching = useAppSelector(state => state.login.isFetching);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const error = useAppSelector(state => state.login.emailError);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
            } else if (values.password.trim().length < 5) {
                errors.password = 'Min 5 symbols';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(requestLogin(values));
        },
    });

    useEffect(() => {
        if (isLoggedIn) {
            return navigate(PATH.profile);
        }
    }, [isLoggedIn]);

    if (isFetching) {
        return <Preloader />;
    }

    return (
        <div className={s.container}>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <div className={s.title}>Sign in</div>
                <div className={s.inputGroup}>
                    <InputText
                        type="email"
                        id="email"
                        {...formik.getFieldProps('email')}
                        placeholder=" "
                    />
                    <label htmlFor="email">Email</label>
                    {formik.errors.email && formik.touched.email && (
                        <div className={s.error}>{formik.errors.email}</div>
                    )}
                </div>
                <div className={s.inputGroup}>
                    <InputText
                        type="password"
                        id="password"
                        {...formik.getFieldProps('password')}
                        placeholder=" "
                    />
                    <label htmlFor="password">Password</label>
                    {formik.errors.password && formik.touched.password && (
                        <div className={s.error}>{formik.errors.password}</div>
                    )}
                    {error && <div className={s.errorResponse}>{error}</div>}
                </div>
                <label className={s.checkbox}>
                    <Checkbox
                        {...formik.getFieldProps('rememberMe')}
                        checked={formik.values.rememberMe}
                    />{' '}
                    Remember me
                </label>
                <NavLink to={PATH.forgotPassword} className={s.forgotPass}>
                    Forgot password?
                </NavLink>
                <Button type="submit" className={s.button}>
                    Sign In
                </Button>
                <div className={s.message}>Already have an account?</div>
                <NavLink to={PATH.registration} className={s.signUp}>
                    Sign Up
                </NavLink>
            </form>
        </div>
    );
};

export default Login;
