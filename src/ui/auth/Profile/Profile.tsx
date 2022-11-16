import React from 'react';

import style from '../../../style/style.module.css';
import Button from '../../components/Button/Button';

import s from './style.module.css';

const Profile = () => {
    return (
        <div className={style.container}>
            <div className={s.card_style}>
                <div className={s.title}>Personal Information</div>
                <div className={s.photo}>Photo</div>
                <div className={s.name}>Ivan</div>
                <div className={s.email}>j&johnson@gmail.com</div>
                <Button className={s.button_style}>log out</Button>
            </div>
        </div>
    );
};

export default Profile;
