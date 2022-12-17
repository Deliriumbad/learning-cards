import React, { ChangeEvent, useEffect, useState } from 'react';

import { updatePacksParams } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import Button from 'ui/common/Button/Button';
import InputText from 'ui/common/InputText/InputText';
import PackCreateModal from 'ui/components/Modals/PackCreateModal/PackCreateModal';

import styles from './PacksNavigation.module.scss';

const PackNavigation = () => {
    const userId = useAppSelector(state => state.login.userData._id);

    const [newPackName, setNewPackName] = useState('');
    const [activeMy, setActiveMy] = useState(false);
    const [activeAll, setActiveAll] = useState(true);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(updatePacksParams({ packName: newPackName }));
        }, 800);
        return () => {
            clearTimeout(timer);
        };
    }, [newPackName]);

    const onSetMyPacksHandler = () => {
        dispatch(updatePacksParams({ user_id: userId }));
        setActiveMy(true);
        setActiveAll(false);
    };
    const onSetAllPacksHandler = () => {
        dispatch(updatePacksParams({ user_id: '' }));
        setActiveAll(true);
        setActiveMy(false);
    };

    const onChangePackNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setNewPackName(value);
    };

    return (
        <nav className={styles.nav}>
            <ul className={styles.links}>
                <li className={styles.item}>
                    <Button
                        className={`${activeMy ? styles.active : ''}`}
                        onClick={onSetMyPacksHandler}
                    >
                        My packs
                    </Button>
                    <Button
                        className={`${activeAll ? styles.active : ''}`}
                        onClick={onSetAllPacksHandler}
                    >
                        All packs
                    </Button>
                </li>

                <li className={styles.item}>
                    <InputText
                        value={newPackName}
                        onChange={onChangePackNameHandler}
                        placeholder="Search by name..."
                    />
                </li>

                <li className={styles.item}>
                    <PackCreateModal />
                </li>
            </ul>
        </nav>
    );
};

export default PackNavigation;
