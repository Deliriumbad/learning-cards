import React from 'react';

import { requestNewPassword } from 'bll/reducers/new-password-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { FormikValues, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'ui/components/Button/Button';
import InputText from 'ui/components/InputText/InputText';
import { PATH } from 'ui/Routes/RoutesPath';

import Preloader from '../../components/Preloader/Preloader';

import s from './NewPassword.module.scss';

type Error = {
    password?: string;
    confirmPassword?: string;
};

const validate = (values: FormikValues) => {
    const errors: Error = {};

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

const NewPassword = () => {
    const error = useAppSelector(state => state.newPassword.error);
    const isFetching = useAppSelector(state => state.login.isFetching);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useParams<{ token: string | undefined }>();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate,
        onSubmit: values => {
            dispatch(requestNewPassword({ password: values.password, resetPasswordToken: token }));
            navigate(PATH.login);
        },
    });

    if (isFetching) {
        return <Preloader />;
    }

    return (
        <div className={s.container}>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <div className={s.title}>Create new password</div>
                <div className={s.inputGroup}>
                    <InputText
                        type="text"
                        id="password"
                        placeholder=" "
                        {...formik.getFieldProps('password')}
                    />
                    <label htmlFor="password">New Password</label>
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
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div className={s.error}>{formik.errors.confirmPassword}</div>
                    )}
                    {error && <div className={s.errorResponse}>{error}</div>}
                </div>
                <div className={s.message}>
                    Create new password and we will send you further instructions to email
                </div>
                <Button type="submit" className={s.button}>
                    Create new password
                </Button>
            </form>
        </div>
    );
};

export default NewPassword;
