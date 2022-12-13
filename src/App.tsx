import React, { useEffect } from 'react';

import './App.scss';
import { requestInitial } from 'bll/reducers/app-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import RoutesPath from 'routes/RoutesPath';
import Preloader from 'ui/common/Preloader/Preloader';
import Layout from 'ui/components/pages/Layout';

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
            <Layout>
                <RoutesPath />
            </Layout>
        </div>
    );
};

export default App;
