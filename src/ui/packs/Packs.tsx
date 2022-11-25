import {ChangeEvent, useEffect, useState} from 'react';

import {updateParamsCards} from 'bll/reducers/cards-reducer';
import {requestPacks, updatePacksParams} from 'bll/reducers/packs-reducer';
import {useAppDispatch, useAppSelector} from 'bll/store/hooks';
import {NavLink} from 'react-router-dom';
import {ReactComponent as Delete} from 'ui/assets/icons/delete.svg';
import {ReactComponent as Edit} from 'ui/assets/icons/edit.svg';
import InputText from 'ui/components/InputText/InputText';

import {PATH} from '../Main/Routes/RoutesPath';

import styles from './Packs.module.scss';
import Pagination from './pagination/Pagination';
import SliderRange from './range-slider/SliderRange';


export const PacksPreLoading = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector(state => state.packs.cardPacks);

    useEffect(() => {
        dispatch(requestPacks());
    }, []);


    const [maxNumberCards, setMaxNumberCards] = useState(0)
    if (packs && packs.length > 0) {
        let step2 = packs.sort((a: any, b: any) => a.cardsCount > b.cardsCount ? 1 : -1).slice(-1)[0].cardsCount
        setTimeout(() => {
            setMaxNumberCards(step2)
        }, 100)
    }

    return (
        <div className={styles.container}>
            {maxNumberCards > 0 ? <Packs2 maxNumberCards={maxNumberCards}/> : 'loading'}
        </div>
    );
};

export const Packs2 = ({maxNumberCards}) => {
    const packs = useAppSelector(state => state.packs.cardPacks);
    const packPage = useAppSelector(state => state.packs.packParams.page);
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<string>('');

    const onChangePackNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        dispatch(updatePacksParams({packName: event.target.value}));
    };

    const onChangePackIdHandler = (packId: string) => {
        dispatch(updateParamsCards({cardsPack_id: packId}));
    };

    useEffect(() => {
        dispatch(requestPacks());
    }, [packPage, dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => dispatch(requestPacks()), 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [value, dispatch]);

    //------------
    const [value1, setValue1] = useState<number>(0)
    const [value2, setValue2] = useState<number>(maxNumberCards)
    let cards = packs.filter(c => c.cardsCount >= value1 && c.cardsCount <= value2)
    // ------------


    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <InputText value={value} onChange={onChangePackNameHandler}/>
                <SliderRange maxNumberCards={maxNumberCards} value2={value2} setValue2={setValue2} value1={value1}
                             setValue1={setValue1}/>
            </div>
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

                    {cards.map(pack => (
                        <tr key={pack._id}>
                            <NavLink to={PATH.cards}>
                                <td>
                                    <button
                                        onClick={() => {
                                            onChangePackIdHandler(pack._id);
                                        }}
                                        type="button"
                                    >
                                        {pack.name}
                                    </button>
                                </td>
                            </NavLink>
                            <td>{pack.cardsCount}</td>
                            <td>{pack.updated}</td>
                            <td>{pack.user_name}</td>
                            <td>
                                <button type="button">
                                    <Delete className={styles.icon}/>
                                </button>
                                <button type="button">
                                    <Edit className={styles.icon}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination/>
            </div>

        </>
    );
};

