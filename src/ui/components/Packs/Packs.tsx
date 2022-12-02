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
    const paramsPackId = useAppSelector(state => state.packs.packParams.user_id);
    const userId = useAppSelector(state => state.login.id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState<string>('');

    const onChangePackNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        dispatch(updatePacksParams({ packName: event.target.value }));
    };

    const onSetMyPackHandler = () => {
        dispatch(updatePacksParams({ user_id: userId }));
    };

    const onButtonHandler = () => {
        navigate(PATH.profile);
    };

    useEffect(() => {
        dispatch(getRequestPacks());
    }, [value, dispatch, packPage, sortPacks, paramsPackId]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.nav}>
                <div>
                    <Button onClick={onButtonHandler} className={styles.button}>
                        &#10094; Back to Profile
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => {
                            onSetMyPackHandler();
                        }}
                    >
                        My pack
                    </Button>
                </div>
                <div>
                    <InputText
                        value={value}
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
