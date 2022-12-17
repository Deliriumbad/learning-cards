import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import styles from 'styles/MainContent.module.scss';
import Loader from 'ui/common/Loader/Loader';

import { getRequestCards, updateParamsCards } from '../../../bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/store/hooks';
import CardCreateModal from '../Modals/CardCreateModal/CardCreateModal';

import CardsNavigation from './cards-utils/cards-navigation/CardsNavigation';
import CardsTable from './cards-utils/cards-table/CardsTable';
import Pagination from './cards-utils/Pagination';

const Cards = () => {
    const dispatch = useAppDispatch();

    const cards = useAppSelector(state => state.cards.cards);
    const userId = useAppSelector(state => state.login.userData._id);
    const id = useAppSelector(state => state.cards.packUserId);

    const cardPage = useAppSelector(state => state.cards.cardsParams.page);
    const cardQuestion = useAppSelector(state => state.cards.cardsParams.cardQuestion);
    const cardAnswer = useAppSelector(state => state.cards.cardsParams.cardAnswer);
    const isLoading = useAppSelector(state => state.app.isLoading);

    const params = useParams();

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
                    <Pagination />
                </div>
            )}
        </div>
    );
};

export default Cards;
