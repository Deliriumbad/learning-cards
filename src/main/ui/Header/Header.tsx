import React from 'react';
import {NavBar} from "./NavBar/NavBar";
import style from './Header.module.css'

export const Header = () => {
    return (
        <div className={style.header}>
            <NavBar/>
        </div>
    );
};
