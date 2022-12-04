import React, { useEffect } from 'react';

import './App.scss';
import { requestInitial } from 'bll/reducers/app-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import Preloader from 'ui/common/Preloader/Preloader';
import Pages from 'ui/components/pages/Pages';

const App = () => {
    const dispatch = useAppDispatch();
    const initialized = useAppSelector(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(requestInitial());
    }, [dispatch]);

    if (!initialized) {
        return <Preloader />;
    }

    return (
        <div className="App">
            <Pages />
        </div>
    );
};

export default App;
