import { ChangeEvent, useState } from 'react';

import { updateGradeRequest } from 'bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import Button from 'ui/common/Button/Button';

import styles from './Answer.module.scss';

type AnswerT = {
    onSetIsShow: (value: boolean) => void;
};

const Answer = ({ onSetIsShow }: AnswerT) => {
    const [grade, setGrade] = useState(0);
    const currentCard = useAppSelector(state => state.cards.currentCard);
    const dispatch = useAppDispatch();

    const onSetGrade = (event: ChangeEvent<HTMLInputElement>) =>
        setGrade(Number(event.currentTarget.value));

    const onNextClickHandler = () => {
        dispatch(updateGradeRequest(currentCard._id, grade));
        onSetIsShow(false);
    };

    return (
        <div className={styles.main}>
            <p>
                <strong>Question</strong>
                <span>Количество попыток ответов на вопрос: 10</span>
            </p>
            <div>
                <p>
                    <strong>Answer: {currentCard.answer}</strong>
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
    );
};

export default Answer;
