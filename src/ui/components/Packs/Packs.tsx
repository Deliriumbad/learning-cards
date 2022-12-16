import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styles from 'styles/MainContent.module.scss';

import { getRequestPacks } from '../../../bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/store/hooks';
import { PATH } from '../../../routes/RoutesPath';

import PackNavigation from './pack-utils/pack-navigation/PacksNavigation';
import PackTable from './pack-utils/packs-table/PackTable';
import Pagination from './pack-utils/pagination/Pagination';

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
        <main className={styles.container}>
            <PackNavigation />
            <PackTable />
            <Pagination />
        </main>
    );
};

export default Packs;
