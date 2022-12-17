import React, { useEffect } from 'react';

import { requestInitial } from 'bll/reducers/app-reducer';
import { useAppDispatch, useAppSelector } from 'bll/store/hooks';
import RoutesPath from 'routes/RoutesPath';
import Loader from 'ui/common/Loader/Loader';
import Layout from 'ui/components/pages/Layout';

const App = () => {
    const dispatch = useAppDispatch();
    const initialized = useAppSelector(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(requestInitial());
    }, [dispatch]);

    if (!initialized) {
        return <Loader />;
    }

    return (
        <div>
            <Layout>
                <RoutesPath />
            </Layout>
        </div>
    );
};

export default App;
