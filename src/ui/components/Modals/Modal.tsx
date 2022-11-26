import styles from './Modal.module.scss';

type ModalT = {
    backgroundOnClick: () => void;
    show: boolean;
    children: React.ReactNode;
};
const Modal = ({ children, show, backgroundOnClick }: ModalT) => {
    if (!show) return null;
    return (
        <div
            className={styles.backdrop}
            tabIndex={0}
            role="button"
            onClick={backgroundOnClick}
            onKeyPress={() => {}}
        >
            <div className={styles.modal}>{children}</div>
        </div>
    );
};

export default Modal;
