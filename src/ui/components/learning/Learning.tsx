import { useEffect, useState } from 'react';

import { getRequestCurrentCards, updateParamsCards } from 'bll/reducers/cards-reducer';
import { useAppDispatch } from 'bll/store/hooks';
import { useParams } from 'react-router-dom';

import Answer from './Answer';
import Question from './Question';

const Learning = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    // const id = useAppSelector(state => state.cards.cardsParams.cardsPack_id);

    const dispatch = useAppDispatch();

    const params = useParams();

    useEffect(() => {
        dispatch(updateParamsCards({ cardsPack_id: params.packId }));
        dispatch(getRequestCurrentCards());
    }, []);

    // useEffect(() => {}, [id]);

    return (
        <>
            <h1>Learn</h1>
            <div>
                {showAnswer ? (
                    <Answer onSetIsShow={setShowAnswer} />
                ) : (
                    <Question onSetIsShow={setShowAnswer} />
                )}
            </div>
        </>
    );
};

export default Learning;
