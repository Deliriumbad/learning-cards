import React from 'react';

import { requestNewPassword } from 'bll/reducers/new-password-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { FormikValues, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from 'routes/RoutesPath';
import styles from 'styles/Form.module.scss';
import Button from 'ui/common/Button/Button';
import InputText from 'ui/common/InputText/InputText';

import Preloader from '../../../common/Loader/Loader';

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
        <div className={styles.container}>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <span className={styles.title}>Create new password</span>
                <div className={styles.login_fields}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">
                            New Password
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
                            Confirm New Password
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
                        {error && <span className={styles.error}>{error}</span>}
                    </div>
                </div>
                <span className={styles.message}>
                    Create new password and we will send you further instructions to email
                </span>
                <Button type="submit" className={styles.btn}>
                    Create new password
                </Button>
            </form>
        </div>
    );
};

export default NewPassword;
