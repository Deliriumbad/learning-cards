import React, { useEffect } from 'react';

import { initialTC } from '../../../bll/reducers/app-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/store/hooks';
import RoutesPath from '../../../routes/RoutesPath';
import Preloader from '../../common/Preloader/Preloader';

import Header from './Header/Header';

const Main = () => {
    const dispatch = useAppDispatch();
    const initialized = useAppSelector(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(initialTC());
    }, []);

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
