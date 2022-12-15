import { ChangeEvent, useEffect, useState } from 'react';

import {
    getRequestCards,
    setCurrentCard,
    updateGradeRequest,
    updateParamsCards,
} from 'bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { useParams } from 'react-router-dom';
import Button from 'ui/common/Button/Button';
import { getSmartRandom } from 'utils/getSmartRandom';

import CardCreateModal from '../Modals/CardCreateModal/CardCreateModal';

import styles from './Learning.module.scss';

const Learning = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [grade, setGrade] = useState(0);
    // const isLoading = useAppSelector(state => state.cards.load);
    const cards = useAppSelector(state => state.cards.cards);
    const currentCard = useAppSelector(state => state.cards.currentCard);

    const dispatch = useAppDispatch();

    const params = useParams();

    useEffect(() => {
        dispatch(updateParamsCards({ cardsPack_id: params.packId }));
        dispatch(getRequestCards());
        dispatch(setCurrentCard(getSmartRandom(cards)));
    }, []);

    const onSetShowAnswerClickHandler = () => {
        setShowAnswer(true);
    };

    const onSetGrade = (event: ChangeEvent<HTMLInputElement>) =>
        setGrade(Number(event.currentTarget.value));

    const onNextClickHandler = () => {
        dispatch(updateGradeRequest(currentCard._id, grade));
        dispatch(setCurrentCard(getSmartRandom(cards)));
        setShowAnswer(false);
    };

    if (cards.length === 0) {
        return <CardCreateModal />;
    }

    return (
        <div>
            {!showAnswer ? (
                <div className={styles.main}>
                    <p>
                        <strong>Quesion:{currentCard.question}</strong>
                    </p>

                    <span>Количество попыток ответов на вопрос: 10</span>
                    <Button onClick={onSetShowAnswerClickHandler}>Show answer</Button>
                </div>
            ) : (
                <div className={styles.main}>
                    <p>
                        <strong>Question</strong>
                        <span>Количество попыток ответов на вопрос: 10</span>
                    </p>
                    <div>
                        <p>
                            <strong>Answer:{currentCard.answer}</strong>
                        </p>
                        <span>Rate yourself</span>
                        <ul>
                            <li>
                                <input onChange={onSetGrade} type="radio" value={1} />
                                <span>Did not know</span>
                            </li>
                            <li>
                                <input onChange={onSetGrade} type="radio" value={2} />
                                <span>Forgot</span>
                            </li>
                            <li>
                                <input onChange={onSetGrade} type="radio" value={3} />
                                <span>A lot of thought</span>
                            </li>
                            <li>
                                <input onChange={onSetGrade} type="radio" value={4} />
                                <span>Confused</span>
                            </li>
                            <li>
                                <input onChange={onSetGrade} type="radio" value={5} />
                                <span>Knew the answer</span>
                            </li>
                        </ul>
                    </div>
                    <Button onClick={onNextClickHandler}>Next</Button>
                </div>
            )}
        </div>
    );
};

export default Learning;
