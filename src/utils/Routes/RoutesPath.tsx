import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from 'ui/auth/ForgotPassword/ForgotPassword';

import Error404 from '../../ui/auth/Error404/Error404';
import Login from '../../ui/auth/Login/Login';
import NewPassword from '../../ui/auth/NewPassword/NewPassword';
import Profile from '../../ui/auth/Profile/Profile';
import Registration from '../../ui/auth/Registration/Registration';
import Test from '../../ui/auth/Test/Test';

export const PATH = {
    error404: '/error-404',
    login: '/login',
    newPassword: '/new-password/:token',
    forgotPassword: '/ForgotPassword',
    profile: '/profile',
    registration: '/registration',
    test: '/test',
};

export const dataPATH = [
    {
        path: PATH.error404,
        element: <Error404 />,
    },
    {
        path: PATH.login,
        element: <Login />,
    },
    {
        path: PATH.newPassword,
        element: <NewPassword />,
    },
    {
        path: PATH.forgotPassword,
        element: <ForgotPassword />,
    },
    {
        path: PATH.profile,
        element: <Profile />,
    },
    {
        path: PATH.registration,
        element: <Registration />,
    },
    {
        path: PATH.test,
        element: <Test />,
    },
];

const RoutesPath = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={PATH.login} />} />
            {dataPATH.map(route => (
                <Route path={route.path} element={route.element} key={route.path} />
            ))}
            <Route path={'/*'} element={<Navigate to={PATH.error404} />} />
        </Routes>
    );
};

export default RoutesPath;
