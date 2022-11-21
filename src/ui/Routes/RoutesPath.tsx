import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from 'ui/auth/ForgotPassword/ForgotPassword';

import Error404 from '../auth/Error404/Error404';
import Login from '../auth/Login/Login';
import NewPassword from '../auth/NewPassword/NewPassword';
import Profile from '../auth/Profile/Profile';
import Registration from '../auth/Registration/Registration';

export const PATH = {
    error404: '/error-404',
    login: '/login',
    newPassword: '/new-password/:token',
    forgotPassword: '/ForgotPassword',
    profile: '/profile',
    registration: '/registration',
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
