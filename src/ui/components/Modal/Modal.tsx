import Button from '../Button/Button';

import styles from './Modal.module.scss';

type ModalT = {
    name: string;
    message: string;
    buttonName: string;
    onConfirm: () => void;
};
const Modal = ({ name, message, buttonName, onConfirm }: ModalT) => {
    return (
        <div
            className={styles.backdrop}
            tabIndex={0}
            role="button"
            onClick={onConfirm}
            onKeyPress={() => {}}
        >
            <div className={styles.modal}>
                <header className={styles.header}>
                    <h1>{name}</h1>
                </header>
                <div className={styles.content}>
                    <p>{message}</p>
                </div>
                <footer className={styles.actions}>
                    <Button onClick={onConfirm}>{buttonName}</Button>
                </footer>
            </div>
        </div>
    );
};

export default Modal;
