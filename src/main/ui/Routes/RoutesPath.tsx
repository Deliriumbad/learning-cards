import React from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import {Login} from "../../../features/auth/Login/Login";
import {Error404} from "../../../features/auth/Error404/Error404";
import {NewPassword} from "../../../features/auth/NewPassword/NewPassword";
import {PasswordRecovery} from "../../../features/auth/PasswordRecovery/PasswordRecovery";
import {Profile} from "../../../features/auth/Profile/Profile";
import {Registration} from "../../../features/auth/Registration/Registration";
import {Test} from "../../../features/auth/Test/Test";

export const PATH = {
    error404: 'error-404',
    login: 'login',
    newPassword: 'new-password',
    passwordRecovery: 'password-recovery',
    profile: 'profile',
    registration: 'registration',
    test: 'test'
}

export const dataPATH = [
    {
        path: PATH.error404,
        element: <Error404/>
    },
    {
        path: PATH.login,
        element: <Login/>
    },
    {
        path: PATH.newPassword,
        element: <NewPassword/>
    },
    {
        path: PATH.passwordRecovery,
        element: <PasswordRecovery/>
    },
    {
        path: PATH.profile,
        element: <Profile/>
    },
    {
        path: PATH.registration,
        element: <Registration/>
    },
    {
        path: PATH.test,
        element: <Test/>
    },
]

export const RoutesPath = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.login}/>}/>
                {
                    dataPATH.map(route => <Route path={route.path} element={route.element} key={route.path}/> )
                }
                <Route path={'/*'} element={<Navigate to={PATH.error404}/>}/>
            </Routes>
        </>
    );
};
