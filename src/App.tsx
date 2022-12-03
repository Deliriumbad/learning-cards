import React, { useEffect } from 'react';

import './App.scss';
import { requestInitial } from 'bll/reducers/app-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import Preloader from 'ui/common/Preloader/Preloader';

import Main from './ui/components/Main/Main';

const App = () => {
    const dispatch = useAppDispatch();
    const initialized = useAppSelector(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(requestInitial());
    }, []);

    if (!initialized) {
        return <Preloader />;
    }

    return (
        <div className="App">
            <Main />
        </div>
    );
};

export default App;
