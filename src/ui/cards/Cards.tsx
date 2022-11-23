import React, { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { getCardsTC } from '../../bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../bll/store/hooks';
import Button from '../components/Button/Button';
import InputText from '../components/InputText/InputText';
import { PATH } from '../Main/Routes/RoutesPath';

import s from './Cards.module.scss';
import CardList from './CardsList/CardList';

const Cards = () => {
    const cards = useAppSelector(state => state.cards.cardsList);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const urlParams = useParams<'cardPackID'>();
    const cardsPackID = urlParams.cardPackID;

    const onButtonHandler = () => {
        navigate(PATH.packs);
    };

    useEffect(() => {
        if (cardsPackID) dispatch(getCardsTC({ cardsPack_id: cardsPackID }));
    }, [dispatch, cardsPackID]);

    return (
        <div className={s.cardsPage}>
            <div>
                <Button onClick={onButtonHandler} className={s.button}>
                    &#10094; Back to Packs List
                </Button>
            </div>
            <div>
                <InputText placeholder="Search by question..." className={s.input} />
            </div>
            <div className={s.tableBlock}>
                <table className={s.table}>
                    <thead className={s.thead}>
                        <tr className={s.tr}>
                            <th>
                                <span className={s.span}>Question</span>
                            </th>
                            <th>
                                <span className={s.span}>Answer</span>
                            </th>
                            <th>
                                <span className={s.span}>Last updated</span>
                            </th>
                            <th>
                                <span className={s.span}>Grade</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className={s.tbody}>
                        {cards.map(c => {
                            return <CardList key={c._id} card={c} />;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cards;
