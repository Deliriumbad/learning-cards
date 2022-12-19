import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styles from 'styles/Form.module.scss';
import Button from 'ui/common/Button/Button';

import { logoutTC } from '../../../../bll/reducers/login-reducer';
import { updateUserProfileTC } from '../../../../bll/reducers/profile-reducer';
import { useAppDispatch, useAppSelector } from '../../../../bll/store/hooks';
import { PATH } from '../../../../routes/RoutesPath';
import dog from '../../../assets/images/dog.png';
import EditableSpan from '../../../common/EditableSpan/EditableSpan';

const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const userEmail = useAppSelector(state => state.login.userData.email);
    const userName = useAppSelector(state => state.login.userData.name);
    const packsCount = useAppSelector(state => state.login.userData.publicCardPacksCount);
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
        if (!isLoggedIn) {
            return navigate(PATH.login);
        }
    }, [isLoggedIn, userEmail, userName]);

    return (
        <div className={styles.form}>
            <span className={styles.title}>Personal Information</span>
            <div className={styles.profile_fields}>
                <div className={styles.field}>
                    <img src={dog} alt="dog" className={styles.img} />
                </div>
                <div className={styles.message}>
                    <EditableSpan
                        className={styles.span}
                        onChange={onChangeHandler}
                        onBlur={onSpanHandler}
                        onEnter={onSpanHandler}
                        value={name}
                    />
                </div>
                <span className={styles.message}>
                    <strong>Email: </strong>
                    {userEmail}
                </span>
                <span className={styles.message}>
                    <strong>Count of created packs: </strong>
                    {packsCount}
                </span>
                <Button type="button" className={styles.btn} onClick={onClickHandler}>
                    log out
                </Button>
            </div>
        </div>
    );
};

export default Profile;
