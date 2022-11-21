import { ChangeEvent, useEffect, useState } from 'react';

import { requestPacks } from 'bll/reducers/packs-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import InputText from 'ui/components/InputText/InputText';

import styles from './Packs.module.scss';
import useDebounce from './UseDebounced';

const Packs = () => {
    const packs = useAppSelector(state => state.packs.packs);
    // const packName = useAppSelector(state => state.packs.packParams.packName);
    // const page = useAppSelector(state => state.packs.packParams.page);

    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestPacks());
    }, [debouncedValue, dispatch]);

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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Packs;
