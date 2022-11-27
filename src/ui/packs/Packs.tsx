import React, { ChangeEvent, useEffect, useState } from 'react';

import { updateParamsCards } from 'bll/reducers/cards-reducer';
import { getRequestPacks, setSortPacks, updatePacksParams } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import InputText from 'ui/components/InputText/InputText';
import DeleteModal from 'ui/components/Modals/Delete/DeleteModal';
import EditModal from 'ui/components/Modals/Edit/EditModal';

import Button from '../components/Button/Button';
import MiniSpinner from '../components/MiniSpinner/MiniSpinner';
import { PATH } from '../Main/Routes/RoutesPath';
import { formatDate } from '../utils/formatDate';

import styles from './Packs.module.scss';
import Pagination from './pagination/Pagination';

const Packs = () => {
    const packs = useAppSelector(state => state.packs.cardPacks);
    const packPage = useAppSelector(state => state.packs.packParams.page);
    const sortPacks = useAppSelector(state => state.packs.packParams.sortPacks);
    const isLoading = useAppSelector(state => state.packs.packParams.isLoading);
    const paramsPackId = useAppSelector(state => state.packs.packParams.user_id);
    const userId = useAppSelector(state => state.login.id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState<string>('');

    const onChangePackNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        dispatch(updatePacksParams({ packName: event.target.value }));
    };

    const onOpenPackHandler = (packId: string) => {
        dispatch(updateParamsCards({ cardsPack_id: packId }));
    };

    const onSetMyPackHandler = () => {
        dispatch(updatePacksParams({ user_id: userId }));
    };

    const onButtonHandler = () => {
        navigate(PATH.profile);
    };

    const onChangePacksSortHandler = (sortType: string) => {
        if (sortPacks === '0' + sortType) {
            dispatch(setSortPacks(`1${sortType}`));
        } else {
            dispatch(setSortPacks(`0${sortType}`));
        }
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
                </div>
            </div>
            <div className={styles.container}>
                <table>
                    <thead className={styles.thead}>
                        <tr>
                            <th onClick={() => onChangePacksSortHandler('name')}>Name &#8681;</th>
                            <th onClick={() => onChangePacksSortHandler('cardsCount')}>
                                Cards &#8681;
                            </th>
                            <th onClick={() => onChangePacksSortHandler('created')}>
                                Last updated &#8681;
                            </th>
                            <th onClick={() => onChangePacksSortHandler('updated')}>
                                Created by &#8681;
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <MiniSpinner />
                    ) : (
                        <tbody>
                            {packs.map(pack => (
                                <tr key={pack._id}>
                                    <td>
                                        <NavLink to={PATH.cards}>
                                            <button
                                                className={styles.button}
                                                onClick={() => {
                                                    onOpenPackHandler(pack._id);
                                                }}
                                                type="button"
                                            >
                                                {pack.name}
                                            </button>
                                        </NavLink>
                                    </td>
                                    <td>{pack.cardsCount}</td>
                                    <td>{formatDate(pack.updated)}</td>
                                    <td>{pack.user_name}</td>
                                    <td>
                                        <DeleteModal id={pack._id} />
                                        <EditModal />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                <div className={styles.pagination}>
                    <Pagination />
                </div>
            </div>
        </div>
    );
};

export default Packs;
