import {
    forgotPassReducer,
    PasswordRecoveryActionsType,
} from 'bll/reducers/forgot-password-reducer';
import { NewPasswordActionsType, newPasswordReducer } from 'bll/reducers/new-password-reducer';
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { LoginActionsType, loginReducer } from '../reducers/login-reducer';
import { ProfileActionsType, profileReducer } from '../reducers/profile-reducer';
import { RegisterActionsType, registerReducer } from '../reducers/register-reducer';

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
type AppActionsType =
    | RegisterActionsType
    | LoginActionsType
    | ProfileActionsType
    | NewPasswordActionsType
    | PasswordRecoveryActionsType;

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
