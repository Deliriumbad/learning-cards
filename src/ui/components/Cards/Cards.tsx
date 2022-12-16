import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import styles from 'styles/MainContent.module.scss';

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

    const params = useParams();

    useEffect(() => {
        dispatch(updateParamsCards({ cardsPack_id: params.packId }));
        dispatch(getRequestCards());
    }, [cardPage, cardQuestion, cardAnswer]);

    if (cards.length === 0 && userId === id) {
        return (
            <div className={styles.card}>
                <h1>This is empty pack</h1>
                <p>Create card to start learn</p>
                <CardCreateModal />
            </div>
        );
    }
    if (cards.length === 0) {
        return (
            <div className={styles.card}>
                <h1>This is empty pack</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <CardsNavigation />
            <CardsTable />
            <Pagination />
        </div>
    );
};

export default Cards;
