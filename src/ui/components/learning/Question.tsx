import Button from 'ui/common/Button/Button';

type QuestionT = {
    question: string;
    onSetIsShow: (value: boolean) => void;
};

const Question = ({ question, onSetIsShow }: QuestionT) => {
    const onSetShowAnswerClickHandler = () => {
        onSetIsShow(true);
    };

    return (
        <div>
            <p>
                <strong>Quesion: {question}</strong>
            </p>
            <span>Количество попыток ответов на вопрос: 10</span>
            <Button onClick={onSetShowAnswerClickHandler}>Show answer</Button>
        </div>
    );
};

export default Question;
