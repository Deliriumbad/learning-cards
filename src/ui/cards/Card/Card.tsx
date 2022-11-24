import React, { FC } from 'react';

import { CardType } from '../../../dal/cards-api';

type CardListPropsType = {
    card: CardType;
};

const Card: FC<CardListPropsType> = ({ card }) => {
    return (
        <tr>
            <td>{card.question}</td>
            <td>{card.answer}</td>
            <td>{card.updated}</td>
            <td>{card.grade}</td>
        </tr>
    );
};

export default Card;
