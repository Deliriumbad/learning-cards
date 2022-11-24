import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    getCardsTC,
    setSearchCardsByQuestion,
    setSortCards,
} from '../../bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../bll/store/hooks';
import Button from '../components/Button/Button';
import InputText from '../components/InputText/InputText';
import { PATH } from '../Main/Routes/RoutesPath';

import Card from './Card/Card';
import s from './Cards.module.scss';

const Cards = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const packId = useAppSelector(state => state.cards.cardsParams.cardsPack_id);
    const cards = useAppSelector(state => state.cards.cards);
    const sortCards = useAppSelector(state => state.cards.cardsParams.sortCards);

    const [value, setValue] = useState<string>('');

    const onChangeSearchCardsHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        dispatch(setSearchCardsByQuestion(value));
    };

    const onChangeCardsSortHandler = (sortType: string) => {
        if (sortCards === '0' + sortType) {
            dispatch(setSortCards(`1${sortType}`));
        } else {
            dispatch(setSortCards(`0${sortType}`));
        }
    };

    const onButtonHandler = () => {
        navigate(PATH.packs);
    };

    useEffect(() => {
        dispatch(getCardsTC());
    }, [packId, value, sortCards]);

    return (
        <div className={s.cardsPage}>
            <div>
                <Button onClick={onButtonHandler} className={s.button}>
                    &#10094; Back to Packs List
                </Button>
            </div>
            <div>
                <InputText
                    placeholder="Search by question..."
                    className={s.input}
                    onChange={onChangeSearchCardsHandler}
                    value={value}
                />
            </div>
            <div className={s.tableBlock}>
                <table className={s.table}>
                    <thead className={s.thead}>
                        <tr className={s.tr}>
                            <th
                                onClick={() => onChangeCardsSortHandler('question')}
                                className={s.sortCell}
                            >
                                Question &#8681;
                            </th>
                            <th
                                onClick={() => onChangeCardsSortHandler('answer')}
                                className={s.sortCell}
                            >
                                Answer &#8681;
                            </th>
                            <th
                                onClick={() => onChangeCardsSortHandler('updated')}
                                className={s.sortCell}
                            >
                                Last updated &#8681;
                            </th>
                            <th
                                onClick={() => onChangeCardsSortHandler('grade')}
                                className={s.sortCell}
                            >
                                Grade &#8681;
                            </th>
                        </tr>
                    </thead>
                    <tbody className={s.tbody}>
                        {cards.map(c => {
                            return <Card card={c} key={c._id} />;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cards;
