import React, { useEffect } from 'react';

import { initialTC } from '../../bll/reducers/app-reducer';
import { useAppDispatch, useAppSelector } from '../../bll/store/hooks';
import Preloader from '../components/Preloader/Preloader';

import Header from './Header/Header';
import RoutesPath from './Routes/RoutesPath';

const Main = () => {
    const dispatch = useAppDispatch();
    const initialized = useAppSelector<boolean>(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(initialTC());
    }, [dispatch]);

    if (!initialized) {
        return <Preloader />;
    }

    return (
        <div>
            <Header />
            <RoutesPath />
        </div>
    );
};
export default Main;
