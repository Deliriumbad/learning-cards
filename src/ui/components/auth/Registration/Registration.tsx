import React from 'react';

import { requestRegistration } from 'bll/reducers/register-reducer';
import { useAppSelector, useAppDispatch } from 'bll/store/hooks';
import { FormikValues, useFormik } from 'formik';
import { useNavigate, NavLink } from 'react-router-dom';
import { PATH } from 'routes/RoutesPath';
import styles from 'styles/Form.module.scss';
import Button from 'ui/common/Button/Button';
import InputText from 'ui/common/InputText/InputText';

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
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <span className={styles.title}>Sign Up</span>
            <div className={styles.registration_fields}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                        Email
                    </label>
                    <InputText
                        type="text"
                        id="email"
                        placeholder=" "
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <span className={styles.error}>{formik.errors.email}</span>
                    )}
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>
                    <InputText
                        type="text"
                        id="password"
                        placeholder=" "
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <span className={styles.error}>{formik.errors.password}</span>
                    )}
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <InputText
                        type="text"
                        id="confirmPassword"
                        placeholder=" "
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <span className={styles.error}>{formik.errors.confirmPassword}</span>
                    )}
                    {error && <span className={styles.errorResponse}>{error}</span>}
                </div>
            </div>
            <Button type="submit" className={styles.btn}>
                Sign Up
            </Button>
            <span className={styles.message}>Already have an account?</span>
            <NavLink to={PATH.login} className={styles.link}>
                Sign In
            </NavLink>
        </form>
    );
};

export default Registration;
