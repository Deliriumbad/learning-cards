import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { logoutTC } from '../../../../bll/reducers/login-reducer';
import { updateUserProfileTC } from '../../../../bll/reducers/profile-reducer';
import { useAppDispatch, useAppSelector } from '../../../../bll/store/hooks';
import { PATH } from '../../../../routes/RoutesPath';
import dog from '../../../assets/images/dog.png';
import logout from '../../../assets/images/logout.png';
import EditableSpan from '../../../common/EditableSpan/EditableSpan';

import s from './Profile.module.scss';

const Profile = () => {
    const isAuth = useAppSelector(state => state.login.isAuth);
    const userEmail = useAppSelector(state => state.login.user.email);
    const userName = useAppSelector(state => state.login.user.name);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onClickHandler = () => {
        dispatch(logoutTC());
    };

    const [name, setStateName] = useState<string>(userName);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStateName(e.currentTarget.value);
    };

    const onSpanHandler = () => {
        if (name.trim() === '') {
            setStateName(userEmail);
            dispatch(updateUserProfileTC({ name: userEmail, avatar: '' }));
        } else {
            dispatch(updateUserProfileTC({ name, avatar: '' }));
        }
    };

    useEffect(() => {
        if (!isAuth) {
            return navigate(PATH.login);
        }
    }, [isAuth, userEmail, userName]);

    return (
        <div className={s.container}>
            <div className={s.card_style}>
                <div className={s.title}>Personal Information</div>
                <div className={s.photo}>
                    <img src={dog} alt="dog" className={s.image} />
                </div>
                <div className={s.email}>{userEmail}</div>
                <div className={s.name}>
                    <EditableSpan
                        className={s.span}
                        onChange={onChangeHandler}
                        onBlur={onSpanHandler}
                        onEnter={onSpanHandler}
                        value={name}
                    />
                </div>
                <button type="button" className={s.button_style} onClick={onClickHandler}>
                    <img src={logout} className={s.log_out_png} alt="img" />
                    <div className={s.title_button}>log out</div>
                </button>
            </div>
        </div>
    );
};

export default Profile;
