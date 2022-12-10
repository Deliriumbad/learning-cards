import { useEffect, useState } from 'react';

import { getRequestCards, setCurrentCard, updateParamsCards } from 'bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { useParams } from 'react-router-dom';
import { getSmartRandom } from 'utils/getSmartRandom';

import Answer from './Answer';
import Question from './Question';

const Learning = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const cards = useAppSelector(state => state.cards.cards);
    const currentCard = useAppSelector(state => state.cards.currentCard);
    const dispatch = useAppDispatch();

    const params = useParams();

    useEffect(() => {
        dispatch(updateParamsCards({ cardsPack_id: params.packId }));
        dispatch(getRequestCards());
    }, [dispatch]);

    useEffect(() => {
        cards.length && dispatch(setCurrentCard(getSmartRandom(cards)));
    }, [cards]);

    return (
        <>
            <h1>Learn</h1>
            <div>
                {showAnswer ? (
                    <Answer onSetIsShow={setShowAnswer} cardId={currentCard._id} />
                ) : (
                    <Question onSetIsShow={setShowAnswer} />
                )}
            </div>
        </>
    );
};

export default Learning;
