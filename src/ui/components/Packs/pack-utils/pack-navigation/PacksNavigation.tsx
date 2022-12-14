import React, { ChangeEvent, useEffect, useState } from 'react';

import { updatePacksParams } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { NavLink } from 'react-router-dom';
import Button from 'ui/common/Button/Button';
import InputText from 'ui/common/InputText/InputText';

import { PATH } from '../../../../../routes/RoutesPath';
import PackCreateModal from '../../../Modals/PackCreateModal/PackCreateModal';

import style from './PacksNavigation.module.scss';

const PackNavigation = () => {
    const userId = useAppSelector(state => state.login.userData._id);

    const [newPackName, setNewPackName] = useState<string>('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(updatePacksParams({ packName: newPackName }));
        }, 800);
        return () => {
            clearTimeout(timer);
        };
    }, [newPackName]);

    const onSetMyPacksHandler = () => {
        dispatch(updatePacksParams({ user_id: userId }));
    };
    const onSetAllPacksHandler = () => {
        dispatch(updatePacksParams({ user_id: '' }));
    };

    const onChangePackNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setNewPackName(value);
    };

    return (
        <nav className={style.nav}>
            <ul className={style.links}>
                <li className={style.item}>
                    <NavLink className={style.link} to={PATH.profile}>
                        🠠 Back to Profile
                    </NavLink>
                </li>

                <li className={style.item}>
                    <Button onClick={onSetMyPacksHandler}>My packs</Button>
                    <Button onClick={onSetAllPacksHandler}>All packs</Button>
                </li>

                <li className={style.item}>
                    <InputText
                        value={newPackName}
                        onChange={onChangePackNameHandler}
                        placeholder="Search by name..."
                    />
                </li>

                <li className={style.item}>
                    <PackCreateModal />
                </li>
            </ul>
        </nav>
    );
};

export default PackNavigation;
