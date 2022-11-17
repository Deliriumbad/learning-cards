import React from 'react';

import { NavLink } from 'react-router-dom';

import { PATH } from '../../../utils/Routes/RoutesPath';

import style from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={style.nav}>
            <ul className={style.list}>
                <li className={style.listItem}>
                    <NavLink to={PATH.login} className={style.link}>
                        Login
                    </NavLink>
                </li>
                <li className={style.listItem}>
                    <NavLink to={PATH.newPassword} className={style.link}>
                        New password
                    </NavLink>
                </li>
                <li className={style.listItem}>
                    <NavLink to={PATH.forgotPassword} className={style.link}>
                        Forgot Password
                    </NavLink>
                </li>

                <li className={style.listItem}>
                    <NavLink to={PATH.profile} className={style.link}>
                        Profile
                    </NavLink>
                </li>
                <li className={style.listItem}>
                    <NavLink to={PATH.registration} className={style.link}>
                        Registration
                    </NavLink>
                </li>
                <li className={style.listItem}>
                    <NavLink to={PATH.test} className={style.link}>
                        Test
                    </NavLink>
                </li>
                <li className={style.listItem}>
                    <NavLink to={PATH.error404} className={style.link}>
                        Error404
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
