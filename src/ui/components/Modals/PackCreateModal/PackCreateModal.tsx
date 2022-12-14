import { ChangeEvent, useState } from 'react';

import { createRequestPack } from 'bll/reducers/packs-reducer';
import { useAppDispatch } from 'bll/store/hooks';

import Button from '../../../common/Button/Button';
import InputText from '../../../common/InputText/InputText';
import Modal from '../Modal';
import styles from '../Modal.module.scss';

const PackCreateModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [packName, setPackName] = useState('');
    const dispatch = useAppDispatch();

    const onClickAddPackHandler = () => {
        dispatch(createRequestPack(packName));
        setShowModal(false);
        setPackName('');
    };

    const onChangePackNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setPackName(value);
    };

    return (
        <>
            <Button
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Add pack
            </Button>
            <Modal show={showModal} backgroundOnClick={() => setShowModal(false)}>
                <header className={styles.header}>Add Pack</header>
                <InputText value={packName} onChange={onChangePackNameHandler} />
                <footer className={styles.actions}>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={onClickAddPackHandler}>Save</Button>
                </footer>
            </Modal>
        </>
    );
};

export default PackCreateModal;
