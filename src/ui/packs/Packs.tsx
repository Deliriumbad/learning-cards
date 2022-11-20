import { useEffect } from 'react';

import { requestPacks } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';

import styles from './Packs.module.scss';

const Packs = () => {
    const packs = useAppSelector(state => state.packs.packs);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(requestPacks());
    }, []);
    return (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Packs;
