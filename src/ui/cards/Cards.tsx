import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../bll/store/hooks';
import Button from '../components/Button/Button';
import InputText from '../components/InputText/InputText';
import { PATH } from '../Main/Routes/RoutesPath';

import s from './Cards.module.scss';
import CardList from './CardsList/CardList';

const Cards = () => {
    const navigate = useNavigate();

    const cards = useAppSelector(state => state.cards.cardsList);

    const onButtonHandler = () => {
        navigate(PATH.packs);
    };

    // нужно задиспатчить санку

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
