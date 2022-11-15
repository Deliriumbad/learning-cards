import React from 'react';

import { useFormik } from 'formik';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    return <form onSubmit={formik.handleSubmit}>Login page</form>;
};

export default Login;
