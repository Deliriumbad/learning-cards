import React from 'react';

import style from './Header.module.css';
import NavBar from './NavBar/NavBar';

const Header = () => {
    return (
        <div className={style.header}>
            <NavBar />
        </div>
    );
};

export default Header;
