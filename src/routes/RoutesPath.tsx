import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from 'ui/components/auth/ForgotPassword/ForgotPassword';
import Packs from 'ui/components/Packs/Packs';

import Error404 from '../ui/components/auth/Error404/Error404';
import Login from '../ui/components/auth/Login/Login';
import NewPassword from '../ui/components/auth/NewPassword/NewPassword';
import Profile from '../ui/components/auth/Profile/Profile';
import Registration from '../ui/components/auth/Registration/Registration';
import Cards from '../ui/components/Cards/Cards';

export const PATH = {
    error404: '/error-404',
    login: '/login',
    newPassword: '/new-password/:token',
    forgotPassword: '/forgot-password',
    profile: '/profile',
    registration: '/registration',
    packs: '/Packs',
    cards: '/Cards/',
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
        path: PATH.packs,
        element: <Packs />,
    },
    {
        path: PATH.cards,
        element: <Cards />,
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
