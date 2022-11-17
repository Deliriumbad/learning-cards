import React, { useState } from 'react';

import { requestForgotPassword } from 'bll/reducers/forgot-password-reducer';
import { useAppDispatch } from 'bll/store/hooks';
import { FormikValues, useFormik } from 'formik';
import Button from 'ui/components/Button/Button';
import InputText from 'ui/components/InputText/InputText';

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
        <div>
            {successfulSend ? (
                <CheckEmail />
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">
                        E-mail
                        <InputText
                            type="text"
                            id="email"
                            error={
                                formik.errors.email && formik.errors.email
                                    ? formik.errors.email
                                    : ''
                            }
                            {...formik.getFieldProps('email')}
                        />
                    </label>

                    <Button type="submit">Submit</Button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
