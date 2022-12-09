import Button from 'ui/common/Button/Button';

type QuestionT = {
    question: string;
};

const Question = ({ question }: QuestionT) => {
    return (
        <div>
            <p>
                <strong>Quesion: {question}</strong>
            </p>
            <span>Количество попыток ответов на вопрос: 10</span>
            <Button>Show answer</Button>
        </div>
    );
};

export default Question;
