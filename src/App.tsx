import React from 'react';

import './App.scss';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from './bll/store/store';
import Main from './ui/components/Main/Main';

const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Main />
                </Provider>
            </HashRouter>
        </div>
    );
};

export default App;
