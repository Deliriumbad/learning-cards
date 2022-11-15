import React from 'react';

import { requestForgotPassword } from 'bll/reducers/forgot-password-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { FormikValues, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from 'ui/components/Button/Button';
import InputText from 'ui/components/InputText/InputText';
import { PATH } from 'utils/Routes/RoutesPath';

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
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const redirect = useAppSelector(state => state.forgotPassword.isRedirect);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: values => {
            dispatch(requestForgotPassword(values.email));
            if (redirect) {
                navigate(PATH.checkEmail);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">
                E-mail
                <InputText
                    type="text"
                    id="email"
                    error={formik.errors.email && formik.errors.email ? formik.errors.email : ''}
                    {...formik.getFieldProps('email')}
                />
            </label>

            <Button type="submit">Submit</Button>
        </form>
    );
};

export default ForgotPassword;
