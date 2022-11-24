import React, { FC } from 'react';

import { CardType } from '../../../dal/cards-api';

import s from './Card.module.scss';

type CardListPropsType = {
    card: CardType;
};

const Card: FC<CardListPropsType> = ({ card }) => {
    return (
        <tr>
            <td className={s.card}>{card.question}</td>
            <td className={s.card}>{card.answer}</td>
            <td className={s.card}>{card.updated}</td>
            <td className={s.card}>{card.grade}</td>
        </tr>
    );
};

export default Card;
