import React, { ChangeEvent, useState } from 'react';

import { setSearchCardsByQuestion } from 'bll/reducers/cards-reducer';
import { useAppDispatch } from 'bll/store/hooks';
import { NavLink } from 'react-router-dom';
import InputText from 'ui/common/InputText/InputText';

import { PATH } from '../../../../../routes/RoutesPath';

import style from './CardsNavigation.module.scss';

const CardsNavigation = () => {
    const [value, setValue] = useState<string>('');

    const dispatch = useAppDispatch();

    const onChangeSearchCardsHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        dispatch(setSearchCardsByQuestion(value));
    };

    return (
        <nav className={style.nav}>
            <ul className={style.links}>
                <li className={style.item}>
                    <NavLink className={style.link} to={PATH.packs}>
                        🠠 Back to Packs List
                    </NavLink>
                </li>

                <li className={style.item}>
                    <InputText
                        placeholder="Search by question..."
                        onChange={onChangeSearchCardsHandler}
                        value={value}
                    />
                </li>
            </ul>
        </nav>
    );
};

export default CardsNavigation;
