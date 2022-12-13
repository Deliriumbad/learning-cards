import React, { useState } from 'react';

import { requestForgotPassword } from 'bll/reducers/forgot-password-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { FormikValues, useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import styles from 'styles/Form.module.scss';
import Button from 'ui/common/Button/Button';
import InputText from 'ui/common/InputText/InputText';

import { PATH } from '../../../../routes/RoutesPath';
import Preloader from '../../../common/Preloader/Preloader';

import CheckEmail from './CheckEmail';

type Error = {
    email?: string;
};

const validate = (values: FormikValues) => {
    const errors: Error = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const ForgotPassword = () => {
    const error = useAppSelector(state => state.forgotPassword.error);
    const isFetching = useAppSelector(state => state.forgotPassword.isFetching);
    const [successfulSend, setSuccessfulSend] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: values => {
            dispatch(requestForgotPassword(values.email));
            setSuccessfulSend(true);
        },
    });

    if (isFetching) {
        return <Preloader />;
    }

    return (
        <div>
            {successfulSend ? (
                <CheckEmail />
            ) : (
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <span className={styles.title}>Forgot your password?</span>
                    <div className={styles.forgot_password_fields}>
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
                                <div className={styles.error}>{formik.errors.email}</div>
                            )}
                            {error && <div className={styles.error}>{error}</div>}
                        </div>
                    </div>
                    <div className={styles.message}>
                        Enter your email address and we will send you further instructions
                    </div>
                    <Button type="submit" className={styles.btn}>
                        Send Instructions
                    </Button>
                    <div className={styles.message}>Did you remember your password?</div>
                    <NavLink to={PATH.login} className={styles.link}>
                        Try logging in
                    </NavLink>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
