import { useAppSelector } from 'bll/store/hooks';
import Button from 'ui/common/Button/Button';

import styles from './Question.module.scss';

type QuestionT = {
    onSetIsShow: (value: boolean) => void;
};

const Question = ({ onSetIsShow }: QuestionT) => {
    const currentCard = useAppSelector(state => state.cards.currentCard);

    const onSetShowAnswerClickHandler = () => {
        onSetIsShow(true);
    };

    return (
        <div className={styles.main}>
            <p>
                <strong>Quesion: {currentCard.question}</strong>
            </p>

            <span>Количество попыток ответов на вопрос: 10</span>
            <Button onClick={onSetShowAnswerClickHandler}>Show answer</Button>
        </div>
    );
};

export default Question;
