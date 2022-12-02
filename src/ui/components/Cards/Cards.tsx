import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
    getCardsTC,
    setSearchCardsByQuestion,
    updateParamsCards,
} from '../../../bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/store/hooks';
import { PATH } from '../../../routes/RoutesPath';
import Button from '../../common/Button/Button';
import InputText from '../../common/InputText/InputText';

import CardsTable from './cards-utils/CardsTable';
import Pagination from './cards-utils/Pagination';
import styles from './Cards.module.scss';

const Cards = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const cardPage = useAppSelector(state => state.cards.cardsParams.page);
    const packId = useAppSelector(state => state.cards.cardsParams.cardsPack_id);
    const sortCards = useAppSelector(state => state.cards.cardsParams.sortCards);
    const isAuth = useAppSelector(state => state.login.isAuth);

    const params = useParams();

    const [value, setValue] = useState<string>('');

    const onChangeSearchCardsHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        dispatch(setSearchCardsByQuestion(value));
    };

    const onButtonHandler = () => {
        navigate(PATH.packs);
    };

    useEffect(() => {
        dispatch(getCardsTC());
    }, [packId, value, sortCards, isAuth, cardPage]);

    useEffect(() => {
        dispatch(updateParamsCards({ cardsPack_id: params.packId }));
    }, []);

    return (
        <div className={styles.cardsPage}>
            <div className={styles.nav}>
                <div>
                    <Button onClick={onButtonHandler} className={styles.button}>
                        &#10094; Back to Packs List
                    </Button>
                </div>
                <div>
                    <InputText
                        placeholder="Search by question..."
                        className={styles.input}
                        onChange={onChangeSearchCardsHandler}
                        value={value}
                    />
                </div>
            </div>
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
