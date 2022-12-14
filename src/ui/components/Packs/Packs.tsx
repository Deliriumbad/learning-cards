import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getRequestPacks } from '../../../bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/store/hooks';
import { PATH } from '../../../routes/RoutesPath';

import PackNavigation from './pack-utils/pack-navigation/PacksNavigation';
import PackTable from './pack-utils/PackTable';
import Pagination from './pack-utils/Pagination/Pagination';
import styles from './Packs.module.scss';

const Packs = () => {
    const packPage = useAppSelector(state => state.packs.packParams.page);
    const sortPacks = useAppSelector(state => state.packs.packParams.sortPacks);
    const packId = useAppSelector(state => state.packs.packParams.user_id);
    const packName = useAppSelector(state => state.packs.packParams.packName);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(getRequestPacks());
    }, [dispatch, packPage, sortPacks, packId, packName]);

    if (!isLoggedIn) {
        navigate(PATH.login);
    }

    return (
        <>
            <div className={styles.nav}>
                <PackNavigation />
            </div>
            <div className={styles.container}>
                <PackTable />
                <div className={styles.pagination}>
                    <Pagination />
                </div>
            </div>
        </>
    );
};

export default Packs;
