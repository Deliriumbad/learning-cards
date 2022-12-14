import { ChangeEvent, useEffect, useState } from 'react';

import {
    getRequestCards,
    setCurrentCard,
    updateGradeRequest,
    updateParamsCards,
} from 'bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { NavLink, useParams } from 'react-router-dom';
import { PATH } from 'routes/RoutesPath';
import Button from 'ui/common/Button/Button';
import Loader from 'ui/common/Loader/Loader';
import { getSmartRandom } from 'utils/getSmartRandom';

import CardCreateModal from '../Modals/CardCreateModal/CardCreateModal';

import styles from './Learning.module.scss';

const Learning = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [grade, setGrade] = useState(0);

    const isLoading = useAppSelector(state => state.app.isLoading);
    const userId = useAppSelector(state => state.login.userData._id);
    const id = useAppSelector(state => state.cards.packUserId);
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

    if (cards.length === 0 && userId === id) {
        return (
            <div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className={styles.card}>
                        <h1>This is empty pack</h1>
                        <p>Create card to start learn</p>
                        <CardCreateModal />
                        <NavLink className={styles.link} to={PATH.packs}>
                            Back to Packs List
                        </NavLink>
                    </div>
                )}
            </div>
        );
    }

    if (cards.length === 0) {
        return (
            <div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className={styles.card}>
                        <h1>This is empty pack</h1>
                        <NavLink className={styles.link} to={PATH.packs}>
                            Back to Packs List
                        </NavLink>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            {!showAnswer ? (
                <div className={styles.quiz}>
                    <p>
                        <strong>Quesion: </strong>
                        <span>{currentCard.question}</span>
                    </p>

                    <span>???????????????????? ?????????????? ?????????????? ???? ????????????: 10</span>
                    <footer className={styles.footer}>
                        <Button onClick={onSetShowAnswerClickHandler}>Show answer</Button>
                        <NavLink className={styles.link} to={PATH.packs}>
                            ???? Back to Packs List
                        </NavLink>
                    </footer>
                </div>
            ) : (
                <div className={styles.quiz}>
                    <p>
                        <strong>Question {currentCard.question}</strong>
                        <br />
                        <br />
                        <span>???????????????????? ?????????????? ?????????????? ???? ????????????: 10</span>
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
                    <footer>
                        <Button className={styles.btn} onClick={onNextClickHandler}>
                            Next
                        </Button>
                        <NavLink className={styles.link} to={PATH.packs}>
                            ???? Back to Packs List
                        </NavLink>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default Learning;
