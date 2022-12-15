import { ChangeEvent, useState } from 'react';

import { createRequestCard } from 'bll/reducers/cards-reducer';
import { useAppDispatch } from 'bll/store/hooks';
import { useParams } from 'react-router-dom';

import Button from '../../../common/Button/Button';
import InputText from '../../../common/InputText/InputText';
import Modal from '../Modal';
import styles from '../Modal.module.scss';

const CardCreateModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const dispatch = useAppDispatch();

    const params = useParams();

    const onClickAddCardHandler = () => {
        dispatch(createRequestCard({ cardsPack_id: params.packId, question, answer }));
        setShowModal(false);
        setQuestion('');
        setAnswer('');
    };

    const onChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setQuestion(value);
    };

    const onChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setAnswer(value);
    };

    return (
        <>
            <div className={styles.modal}>
                <header>This is empty pack</header>
                <p>Create card to start learn</p>
                <Button
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    Add card
                </Button>
            </div>

            <Modal show={showModal} backgroundOnClick={() => setShowModal(false)}>
                <header>Add Card</header>
                <InputText value={question} onChange={onChangeQuestionHandler} />
                <InputText value={answer} onChange={onChangeAnswerHandler} />
                <footer className={styles.actions}>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={onClickAddCardHandler}>Save</Button>
                </footer>
            </Modal>
        </>
    );
};

export default CardCreateModal;
