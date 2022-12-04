import { ChangeEvent, useState } from 'react';

import { updateRequestPack } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { ReactComponent as Edit } from 'ui/assets/icons/edit.svg';

import Button from '../../../common/Button/Button';
import InputText from '../../../common/InputText/InputText';
import Modal from '../Modal';
import styles from '../Modal.module.scss';

type DeleteModalT = {
    id: string;
};

const PackEditModal = ({ id }: DeleteModalT) => {
    const [showModal, setShowModal] = useState(false);

    const currentPack = useAppSelector(state =>
        state.packs.cardPacks.find(pack => pack._id === id),
    );
    const [packName, setPackName] = useState(currentPack?.name || '');
    const dispatch = useAppDispatch();

    const onChangePackNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setPackName(value);
    };

    const onClickUpdatePackHandler = () => {
        dispatch(updateRequestPack(id, packName));
        setShowModal(false);
        setPackName('');
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
                <InputText value={packName} onChange={onChangePackNameHandler} />
                <footer className={styles.actions}>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={onClickUpdatePackHandler}>Edit</Button>
                </footer>
            </Modal>
        </>
    );
};

export default PackEditModal;
