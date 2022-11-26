import React, { ChangeEvent, useEffect, useState } from 'react';

import { updateParamsCards } from 'bll/reducers/cards-reducer';
import { requestPacks, setSortPacks, updatePacksParams } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as Delete } from 'ui/assets/icons/delete.svg';
import { ReactComponent as Edit } from 'ui/assets/icons/edit.svg';
import InputText from 'ui/common/InputText/InputText';

import { PATH } from '../../../routes/RoutesPath';
import { formatDate } from '../../../utils/formatDate';
import Button from '../../common/Button/Button';
import MiniSpinner from '../../common/MiniSpinner/MiniSpinner';

import styles from './Packs.module.scss';
import Pagination from './Pagination/Pagination';

const Packs = () => {
    const packs = useAppSelector(state => state.packs.cardPacks);
    const packPage = useAppSelector(state => state.packs.packParams.page);
    const sortPacks = useAppSelector(state => state.packs.packParams.sortPacks);
    const isAuth = useAppSelector(state => state.login.isAuth);
    const isLoading = useAppSelector(state => state.packs.packParams.isLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState<string>('');

    const onChangePackNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        dispatch(updatePacksParams({ packName: event.target.value }));
    };

    const onChangePackIdHandler = (packId: string) => {
        dispatch(updateParamsCards({ cardsPack_id: packId }));
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
        dispatch(requestPacks());
    }, [value, dispatch, packPage, sortPacks, isAuth]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.nav}>
                <div>
                    <Button onClick={onButtonHandler} className={styles.button}>
                        &#10094; Back to Profile
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
                                                    onChangePackIdHandler(pack._id);
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
                                        <button type="button">
                                            <Delete className={styles.icon} />
                                        </button>
                                        <button type="button">
                                            <Edit className={styles.icon} />
                                        </button>
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