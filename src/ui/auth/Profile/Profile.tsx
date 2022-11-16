import React, { useEffect } from 'react';

import { logOutAC } from 'bll/reducers/profile-reducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../bll/store/hooks';
import logout from '../../../common/img/logout.png';
import style from '../../../style/style.module.css';

import s from './style.module.css';

const Profile = () => {
    const isLogOut = useAppSelector(state => state.profile.isLogOut);

    const navigate = useNavigate();
    useEffect(() => {
        if (isLogOut) {
            isLogOut && navigate('/');
        }
    }, [isLogOut]);

    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(logOutAC());
    };
    return (
        <div className={style.container}>
            <div className={s.card_style}>
                <div className={s.title}>Personal Information</div>
                <div className={s.photo}>Photo</div>
                <div className={s.name}>Ivan</div>
                <div className={s.email}>j&johnson@gmail.com</div>
                <button type="button" className={style.button_style} onClick={onClickHandler}>
                    <img src={logout} className={s.log_out_png} alt="img" />
                    <div className={s.title_button}>log out</div>
                </button>
            </div>
        </div>
    );
};

export default Profile;
