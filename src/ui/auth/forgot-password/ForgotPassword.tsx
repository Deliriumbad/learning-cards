import React, { useState } from 'react';

import { requestForgotPassword } from 'bll/reducers/forgot-password-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { FormikValues, useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import Button from 'ui/components/Button/Button';
import InputText from 'ui/components/InputText/InputText';

import { PATH } from '../../../utils/Routes/RoutesPath';

import CheckEmail from './CheckEmail';
import s from './ForgotPassword.module.scss';

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

    return (
        <div className={s.container}>
            {successfulSend ? (
                <CheckEmail />
            ) : (
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <div className={s.title}>Forgot your password?</div>
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
                    <div className={s.fist_message}>
                        Enter your email address and we will send you further instructions
                    </div>
                    <Button type="submit" className={s.button}>
                        Send Instructions
                    </Button>
                    <div className={s.second_message}>Did you remember your password?</div>
                    <NavLink to={PATH.login} className={s.signIn}>
                        Try logging in
                    </NavLink>
                </form>
            )}
            {error && <div className={s.errorResponse}>{error}</div>}
        </div>
    );
};

export default ForgotPassword;
