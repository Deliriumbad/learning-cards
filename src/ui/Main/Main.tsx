import React, { useEffect } from 'react';

import { initialTC } from '../../bll/reducers/app-reducer';
import { useAppDispatch } from '../../bll/store/hooks';

import Header from './Header/Header';
import RoutesPath from './Routes/RoutesPath';

const Main = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initialTC());
    }, [dispatch]);

    return (
        <div>
            <Header />
            <RoutesPath />
        </div>
    );
};
export default Main;
