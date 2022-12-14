import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { getRequestCards, updateParamsCards } from '../../../bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/store/hooks';

import CardsNavigation from './cards-utils/cards-navigation/CardsNavigation';
import CardsTable from './cards-utils/cards-table/CardsTable';
import Pagination from './cards-utils/Pagination';
import styles from './Cards.module.scss';

const Cards = () => {
    const dispatch = useAppDispatch();

    const cardPage = useAppSelector(state => state.cards.cardsParams.page);
    const cardQuestion = useAppSelector(state => state.cards.cardsParams.cardQuestion);
    const cardAnswer = useAppSelector(state => state.cards.cardsParams.cardAnswer);

    const params = useParams();

    // useEffect(() => {
    //     dispatch(updateParamsCards({ cardsPack_id: params.packId }));
    // }, []);

    useEffect(() => {
        dispatch(updateParamsCards({ cardsPack_id: params.packId }));
        dispatch(getRequestCards());
    }, [cardPage, cardQuestion, cardAnswer]);

    return (
        <div className={styles.cardsPage}>
            <CardsNavigation />
            <div className={styles.tableBlock}>
                <CardsTable />
                <div className={styles.pagination}>
                    <Pagination />
                </div>
            </div>
        </div>
    );
};

export default Cards;
