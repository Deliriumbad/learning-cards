import React from 'react';

import { requestNewPassword } from 'bll/reducers/new-password-reducer';
import { useAppDispatch } from 'bll/store/hooks';
import { FormikValues, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'ui/components/Button/Button';
import InputText from 'ui/components/InputText/InputText';
import { PATH } from 'utils/Routes/RoutesPath';

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
    const navigate = useNavigate();

    const { token } = useParams<{ token: string | undefined }>();

    const dispatch = useAppDispatch();

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
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="password">
                New Password
                <InputText
                    type="text"
                    id="password"
                    error={
                        formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : ''
                    }
                    {...formik.getFieldProps('password')}
                />
            </label>

            <label htmlFor="confirmPassword">
                Confirm New Password
                <InputText
                    type="text"
                    id="confirmPassword"
                    error={
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                            ? formik.errors.confirmPassword
                            : ''
                    }
                    {...formik.getFieldProps('confirmPassword')}
                />
            </label>

            <Button type="submit">Submit</Button>
        </form>
    );
};

export default NewPassword;
