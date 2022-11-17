import forgotPassReducer from 'bll/reducers/forgot-password-reducer';
import { newPasswordReducer } from 'bll/reducers/new-password-reducer';
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { loginReducer } from '../reducers/login-reducer';
import { profileReducer } from '../reducers/profile-reducer';
import { RegisterActionType, registerReducer } from '../reducers/register-reducer';

const reducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    forgotPassword: forgotPassReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
});

export const store = legacy_createStore(reducers, applyMiddleware(thunk));

export type RootSate = ReturnType<typeof store.getState>;

export type AppStoreType = ReturnType<typeof reducers>;
type AppActionsType = RegisterActionType;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AppActionsType
>;

// @ts-ignore
window.store = store;
