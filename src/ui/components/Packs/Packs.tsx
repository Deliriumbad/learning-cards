import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getRequestPacks, updatePacksParams } from '../../../bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/store/hooks';
import { PATH } from '../../../routes/RoutesPath';
import Button from '../../common/Button/Button';
import InputText from '../../common/InputText/InputText';
import PackCreateModal from '../Modals/PackCreateModal/PackCreateModal';

import PackTable from './pack-utils/PackTable';
import Pagination from './pack-utils/Pagination/Pagination';
import styles from './Packs.module.scss';

const Packs = () => {
    const packPage = useAppSelector(state => state.packs.packParams.page);
    const sortPacks = useAppSelector(state => state.packs.packParams.sortPacks);
    const userId = useAppSelector(state => state.login.userData._id);
    const packId = useAppSelector(state => state.packs.packParams.user_id);
    const packName = useAppSelector(state => state.packs.packParams.packName);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [newPackName, setNewPackName] = useState<string>('');

    const onChangePackNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setNewPackName(value);
    };

    const onSetMyPackHandler = () => {
        dispatch(updatePacksParams({ user_id: userId }));
    };
    const onSetAllPackHandler = () => {
        dispatch(updatePacksParams({ user_id: '' }));
    };

    const onButtonHandler = () => {
        navigate(PATH.profile);
    };

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(getRequestPacks());
    }, [dispatch, packPage, sortPacks, packId, packName]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(updatePacksParams({ packName: newPackName }));
        }, 800);
        return () => {
            clearTimeout(timer);
        };
    }, [newPackName]);

    if (!isLoggedIn) {
        navigate(PATH.login);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.nav}>
                <div>
                    <Button onClick={onButtonHandler} className={styles.button}>
                        &#10094; Back to Profile
                    </Button>
                </div>
                <div>
                    <Button onClick={onSetMyPackHandler}>My</Button>
                    <Button onClick={onSetAllPackHandler}>All</Button>
                </div>
                <div>
                    <InputText
                        value={newPackName}
                        onChange={onChangePackNameHandler}
                        className={styles.input}
                        placeholder="Search by name..."
                    />
                    <PackCreateModal />
                </div>
            </div>
            <div className={styles.container}>
                <PackTable />
                <div className={styles.pagination}>
                    <Pagination />
                </div>
            </div>
        </div>
    );
};

export default Packs;
