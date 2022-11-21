import { ChangeEvent, useEffect, useState } from 'react';

import { requestPacks, updatePacksParams } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import Edit from 'common/icons/Edit';
import Trash from 'common/icons/Trash';
import InputText from 'ui/components/InputText/InputText';

import styles from './Packs.module.scss';

const Packs = () => {
    const packs = useAppSelector(state => state.packs.packs);
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        dispatch(updatePacksParams({ packName: event.target.value }));
    };

    useEffect(() => {
        const timer = setTimeout(() => dispatch(requestPacks()), 1500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, dispatch]);

    return (
        <>
            <InputText value={value} onChange={handleChange} />
            <div className={styles.container}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cards</th>
                            <th>Last updated</th>
                            <th>Created by</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {packs.map(pack => (
                            <tr>
                                <td>{pack.name}</td>
                                <td>{pack.cardsCount}</td>
                                <td>{pack.updated}</td>
                                <td>{pack.user_name}</td>
                                <td>
                                    <button type="button">
                                        <Trash />
                                    </button>
                                    <button type="button">
                                        <Edit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Packs;
