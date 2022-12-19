import { useState } from 'react';

import { deleteRequestPack } from 'bll/reducers/packs-reducer';
import { useAppDispatch } from 'bll/store/hooks';
import { ReactComponent as Delete } from 'ui/assets/icons/delete.svg';

import Button from '../../../common/Button/Button';
import Modal from '../Modal';
import styles from '../Modal.module.scss';

type DeleteModalT = {
    id: string;
};

const PackDeleteModal = ({ id }: DeleteModalT) => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useAppDispatch();

    const onDeletePackCLickHandler = () => {
        dispatch(deleteRequestPack(id));
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
                <header className={styles.header}>Delete Pack</header>
                <div>
                    <p className={styles.content}>
                        Do you really want to remove this Pack?
                        <br />
                        <br />
                        All cards will be excluded from this course.
                    </p>
                </div>
                <footer className={styles.actions}>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={onDeletePackCLickHandler}>Delete</Button>
                </footer>
            </Modal>
        </>
    );
};

export default PackDeleteModal;
