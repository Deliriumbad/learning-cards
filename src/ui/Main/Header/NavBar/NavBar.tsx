import React from 'react';

import { NavLink } from 'react-router-dom';

import { PATH } from '../../Routes/RoutesPath';

import style from './NavBar.module.scss';


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
                    <NavLink to={PATH.error404} className={style.link}>
                        Error404
                    </NavLink>
                </li>
                <li className={style.listItem}>
                    <NavLink to={PATH.packs} className={style.link}>
                        Packs
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
