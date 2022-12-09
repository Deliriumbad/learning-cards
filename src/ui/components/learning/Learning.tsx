import { useEffect, useState } from 'react';

import { getRequestCards, updateParamsCards } from 'bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { CardType } from 'dal/cards-api';
import { useParams } from 'react-router-dom';

import Answer from './Answer';
import Question from './Question';

const Learning = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const arrayCards = useAppSelector(state => state.cards.cards);

    const dispatch = useAppDispatch();

    const params = useParams();

    useEffect(() => {
        dispatch(updateParamsCards({ cardsPack_id: params.packId }));
    }, []);

    useEffect(() => {
        dispatch(getRequestCards());
    }, []);

    const getCard = (cards: CardType[]) => {
        const length = cards.reduce((acc, card) => acc + (6 - card.grade) ** 2, 0);

        const rand = Math.random() * length;

        let id = 0;
        let sum = 0;

        while (sum < rand) {
            sum += (6 - cards[id].grade) ** 2;
            id += 1;
        }

        console.log(length, id, sum);

        return cards[id - 1];
    };

    const currentCard = getCard(arrayCards);

    return (
        <>
            <h1>Learn</h1>
            <div>
                {showAnswer ? (
                    <Answer cardId={currentCard._id} answer={currentCard.answer} />
                ) : (
                    <Question onSetIsShow={setShowAnswer} question={currentCard.question} />
                )}
            </div>
        </>
    );
};

export default Learning;
