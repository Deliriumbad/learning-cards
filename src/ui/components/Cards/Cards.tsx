import React, { useEffect } from 'react';

import { NavLink, useParams } from 'react-router-dom';
import { PATH } from 'routes/RoutesPath';
import styles from 'styles/MainContent.module.scss';
import Loader from 'ui/common/Loader/Loader';
import usePagination from 'ui/hooks/usePagination';

import { getRequestCards, updateParamsCards } from '../../../bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/store/hooks';
import CardCreateModal from '../Modals/CardCreateModal/CardCreateModal';

import CardsNavigation from './cards-utils/cards-navigation/CardsNavigation';
import CardsTable from './cards-utils/cards-table/CardsTable';

const Cards = () => {
    const dispatch = useAppDispatch();

    const pageCount = useAppSelector(state => state.cards.cardsParams.pageCount);
    const cardPacksTotalCount = useAppSelector(state => state.cards.cardsTotalCount);

    const cards = useAppSelector(state => state.cards.cards);
    const userId = useAppSelector(state => state.login.userData._id);
    const id = useAppSelector(state => state.cards.packUserId);

    const cardPage = useAppSelector(state => state.cards.cardsParams.page);
    const cardQuestion = useAppSelector(state => state.cards.cardsParams.cardQuestion);
    const cardAnswer = useAppSelector(state => state.cards.cardsParams.cardAnswer);
    const isLoading = useAppSelector(state => state.app.isLoading);

    const params = useParams();

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
        pageNumberLimit: 5,
    });

    useEffect(() => {
        dispatch(updateParamsCards({ page: currentPage }));
    }, [currentPage]);

    useEffect(() => {
        dispatch(updateParamsCards({ cardsPack_id: params.packId }));
        dispatch(getRequestCards());
    }, [cardPage, cardQuestion, cardAnswer]);

    if (cards.length === 0 && userId === id) {
        return (
            <div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className={styles.card}>
                        <h1>This is empty pack</h1>
                        <p>There is nothing to learn. Create cards to fill this pack</p>
                        <CardCreateModal />
                        <NavLink className={styles.link} to={PATH.packs}>
                            Back to Packs List
                        </NavLink>
                    </div>
                )}
            </div>
        );
    }
    if (cards.length === 0) {
        return (
            <div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className={styles.card}>
                        <h1>This is empty pack</h1>
                        <p>There is nothing to learn</p>
                        <NavLink className={styles.link} to={PATH.packs}>
                            Back to Packs List
                        </NavLink>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={styles.container}>
                    <CardsNavigation />
                    <CardsTable />
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
                </div>
            )}
        </div>
    );
};

export default Cards;
