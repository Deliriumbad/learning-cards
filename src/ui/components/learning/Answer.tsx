// import { useAppDispatch } from 'bll/store/hooks';
import styles from './Answer.module.scss';

type AnswerT = {
    answer: string;
};

const Answer = ({ answer }: AnswerT) => {
    // const dispatch = useAppDispatch();
    return (
        <div className={styles.main}>
            <p>
                <strong>Question</strong>
                <span>Количество попыток ответов на вопрос: 10</span>
            </p>
            <div>
                <p>
                    <strong>Answer: {answer}</strong>
                </p>
                <span>Rate yourself</span>
                <ul>
                    <li>
                        <input type="radio" value={1} />
                        <span>Did not know</span>
                    </li>
                    <li>
                        <input type="radio" value={2} />
                        <span>Forgot</span>
                    </li>
                    <li>
                        <input type="radio" value={3} />
                        <span>A lot of thought</span>
                    </li>
                    <li>
                        <input type="radio" value={4} />
                        <span>Confused</span>
                    </li>
                    <li>
                        <input type="radio" value={5} />
                        <span>Knew the answer</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Answer;
