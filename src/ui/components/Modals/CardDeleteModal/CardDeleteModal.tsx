import { useState } from 'react';

import { deleteRequestCard } from 'bll/reducers/cards-reducer';
import { useAppDispatch } from 'bll/store/hooks';
import { ReactComponent as Delete } from 'ui/assets/icons/delete.svg';

import Button from '../../../common/Button/Button';
import Modal from '../Modal';
import styles from '../Modal.module.scss';

type DeleteModalT = {
    id: string;
};

const CardDeleteModal = ({ id }: DeleteModalT) => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useAppDispatch();

    const onDeleteCardCLickHandler = () => {
        dispatch(deleteRequestCard(id));
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
                <Delete className={styles.icon} />
            </button>
            <Modal show={showModal} backgroundOnClick={() => setShowModal(false)}>
                <header className={styles.header}>Delete Card</header>
                <div>
                    <p className={styles.content}>Do you really want to remove this card?</p>
                </div>
                <footer className={styles.actions}>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={onDeleteCardCLickHandler}>Delete</Button>
                </footer>
            </Modal>
        </>
    );
};

export default CardDeleteModal;
