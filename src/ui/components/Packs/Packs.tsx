import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styles from 'styles/MainContent.module.scss';
import Loader from 'ui/common/Loader/Loader';
import usePagination from 'ui/hooks/usePagination';

import { getRequestPacks, updatePacksParams } from '../../../bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/store/hooks';
import { PATH } from '../../../routes/RoutesPath';

import PackNavigation from './pack-utils/pack-navigation/PacksNavigation';
import PackTable from './pack-utils/packs-table/PackTable';

const Packs = () => {
    const packPage = useAppSelector(state => state.packs.packParams.page);
    const sortPacks = useAppSelector(state => state.packs.packParams.sortPacks);
    const packId = useAppSelector(state => state.packs.packParams.user_id);
    const packName = useAppSelector(state => state.packs.packParams.packName);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const isLoading = useAppSelector(state => state.app.isLoading);

    const pageCount = useAppSelector(state => state.packs.packParams.pageCount);
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        currentPage,
        totalPages,
        renderPageNumbers,
        pageDecrementBtn,
        pageIncrementBtn,
        leftIArrow,
        rightArrow,
    } = usePagination({
        contentPerPage: pageCount,
        totalElements: cardPacksTotalCount,
        pageNumberLimit: 10,
    });

    useEffect(() => {
        dispatch(updatePacksParams({ page: currentPage }));
    }, [currentPage]);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(getRequestPacks());
    }, [dispatch, packPage, sortPacks, packId, packName, isLoggedIn]);

    if (!isLoggedIn) {
        navigate(PATH.login);
    }

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <main className={styles.container}>
                    <PackNavigation />
                    <PackTable />
                    {totalPages < 2 ? null : (
                        <div className={styles.pagination}>
                            <p>
                                {currentPage}/{totalPages}
                            </p>
                            {leftIArrow}
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}
                            {rightArrow}
                        </div>
                    )}
                </main>
            )}
        </div>
    );
};

export default Packs;
