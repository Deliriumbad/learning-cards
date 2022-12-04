import { ChangeEvent, useState } from 'react';

import { updateRequestCard } from 'bll/reducers/cards-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { ReactComponent as Edit } from 'ui/assets/icons/edit.svg';

import Button from '../../../common/Button/Button';
import InputText from '../../../common/InputText/InputText';
import Modal from '../Modal';
import styles from '../Modal.module.scss';

type DeleteModalT = {
    id: string;
};

const CardEditModal = ({ id }: DeleteModalT) => {
    const [showModal, setShowModal] = useState(false);

    const currentCard = useAppSelector(state => state.cards.cards.find(card => card._id === id));
    const [cardQuestion, setCardQuestion] = useState(currentCard?.question || '');
    const [cardAnswer, setCardAnswer] = useState(currentCard?.answer || '');
    const dispatch = useAppDispatch();

    const onChangeCardQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setCardQuestion(value);
    };
    const onChangeCardAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setCardAnswer(value);
    };

    const onClickUpdateCardHandler = () => {
        dispatch(updateRequestCard(id, cardQuestion, cardAnswer));
        setShowModal(false);
    };

    return (
        <>
            <button
                onClick={() => {
                    setShowModal(true);
                }}
                type="button"
            >
                <Edit className={styles.icon} />
            </button>
            <Modal show={showModal} backgroundOnClick={() => setShowModal(false)}>
                <header className={styles.header}>Edit Pack</header>
                <InputText value={cardQuestion} onChange={onChangeCardQuestionHandler} />
                <InputText value={cardAnswer} onChange={onChangeCardAnswerHandler} />
                <footer className={styles.actions}>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={onClickUpdateCardHandler}>Edit</Button>
                </footer>
            </Modal>
        </>
    );
};

export default CardEditModal;
