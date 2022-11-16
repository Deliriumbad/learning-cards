import React from 'react';

import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { loginTC } from '../../../bll/reducers/login-reducer';
import { useAppDispatch } from '../../../bll/store/hooks';
import { PATH } from '../../../utils/Routes/RoutesPath';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/CheckBox/Checkbox';
import InputText from '../../components/InputText/InputText';

import s from './Login.module.css';

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

const Login = () => {
    const dispatch = useAppDispatch();
    //  const isAuth = useAppSelector<boolean>(state => state.login.isAuth);
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
            dispatch(loginTC(values));
        },
    });

    /*  if (isAuth) {
        return redirect(PATH.profile);
    }   */
    return (
        <form onSubmit={formik.handleSubmit} className={s.form}>
            <div className={s.title}>Sign in</div>
            <label htmlFor="email" className={s.label}>
                Email
                <InputText
                    type="email"
                    id="email"
                    className={s.mailInput}
                    {...formik.getFieldProps('email')}
                />
            </label>
            {formik.errors.email && formik.touched.email && (
                <span className={s.error}>{formik.errors.email}</span>
            )}
            <label htmlFor="password" className={s.label}>
                Password
                <InputText
                    type="password"
                    id="password"
                    className={s.passInput}
                    {...formik.getFieldProps('password')}
                />
            </label>
            {formik.errors.password && formik.touched.password && (
                <span className={s.error}>{formik.errors.password}</span>
            )}
            <label className={s.checkbox}>
                <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                />{' '}
                Remember me
            </label>
            <NavLink to={PATH.passwordRecovery} className={s.forgotPass}>
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
    );
};

export default Login;
