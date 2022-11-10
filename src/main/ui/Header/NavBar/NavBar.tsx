import React from 'react';
import { NavLink } from 'react-router-dom';
import {PATH} from "../../Routes/RoutesPath";

export const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to={PATH.login}>Login</NavLink></li>
                <li><NavLink to={PATH.newPassword}>New password</NavLink></li>
                <li><NavLink to={PATH.passwordRecovery}>Password recovery</NavLink></li>
                <li><NavLink to={PATH.profile}>Profile</NavLink></li>
                <li><NavLink to={PATH.registration}>Registration</NavLink></li>
                <li><NavLink to={PATH.test}>Test</NavLink></li>
                <li><NavLink to={PATH.error404}>Error404</NavLink></li>
            </ul>
        </nav>
    );
};

