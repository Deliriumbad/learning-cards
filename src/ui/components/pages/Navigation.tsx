import React from 'react';

import { NavLink } from 'react-router-dom';

import { PATH } from '../../../routes/RoutesPath';

import style from './Navigation.module.scss';

const Navigation = () => {
    return (
        <nav className={style.nav}>
            <ul className={style.links}>
                <li className={style.item}>
                    <NavLink to={PATH.login} className={style.link}>
                        Login
                    </NavLink>
                </li>

                <li className={style.item}>
                    <NavLink to={PATH.profile} className={style.link}>
                        Profile
                    </NavLink>
                </li>

                <li className={style.item}>
                    <NavLink to={PATH.packs} className={style.link}>
                        Packs
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
