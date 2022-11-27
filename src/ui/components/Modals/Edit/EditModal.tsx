import { useState } from 'react';

import { ReactComponent as Edit } from 'ui/assets/icons/edit.svg';
import Button from 'ui/components/Button/Button';

import Modal from '../Modal';
import styles from '../Modal.module.scss';

const EditModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button type="button">
                <Edit className={styles.icon} />
            </button>
            <Modal show={showModal} backgroundOnClick={() => setShowModal(false)}>
                <header className={styles.header}>Edit Pack</header>
                <div>
                    <p className={styles.content}>Change Name</p>
                </div>
                <footer className={styles.actions}>
                    <Button>Delete</Button>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                </footer>
            </Modal>
        </>
    );
};

export default EditModal;
