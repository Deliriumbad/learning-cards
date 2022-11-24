import React, { useEffect } from 'react';

import { initialTC } from '../../bll/reducers/app-reducer';
import { useAppDispatch, useAppSelector } from '../../bll/store/hooks';
import Preloader from '../components/Preloader/Preloader';

import Header from './Header/Header';
import RoutesPath from './Routes/RoutesPath';

const Main = () => {
    const isInitialised = useAppSelector(state => state.app.isInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initialTC());
    }, [dispatch]);

    if (!isInitialised) {
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
