import forgotPassReducer from 'bll/reducers/forgot-password-reducer';
import { newPasswordReducer } from 'bll/reducers/new-password-reducer';
import { packsReducer } from 'bll/reducers/packs-reducer';
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { loginReducer } from '../reducers/login-reducer';
import { profileReducer } from '../reducers/profile-reducer';
import { registerReducer } from '../reducers/register-reducer';

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgotPassword: forgotPassReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    packs: packsReducer,
});

export const store = legacy_createStore(reducers, applyMiddleware(thunk));

export type RootSate = ReturnType<typeof store.getState>;

export type AppStoreType = ReturnType<typeof reducers>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

// @ts-ignore
window.store = store;
