import { authAPI } from 'dal/auth-api';

import { AppThunk } from '../store/store';

import { setIsLoggedIn } from './login-reducer';

export const appInitState = {
    isInitialized: false,
    isLoading: false,
    emailError: null as null | string,
};

type InitStateType = typeof appInitState;

export const appReducer = (
    state: InitStateType = appInitState,
    action: AppInitActionsType,
): InitStateType => {
    switch (action.type) {
        case 'APP/SET_IS_INITIALIZED':
            return { ...state, isInitialized: action.value };
        case 'APP/SET_ERROR':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const setIsInitialized = (value: boolean) =>
    ({ type: 'APP/SET_IS_INITIALIZED', value } as const);
export const setIsLoading = (value: boolean) =>
    ({ type: 'APP/SET_IS_LOADING', payload: { isLoading: value } } as const);
export const setError = (value: null | string) =>
    ({ type: 'APP/SET_ERROR', payload: { error: value } } as const);

export const requestInitial = (): AppThunk => {
    return dispatch => {
        authAPI
            .me()
            .then(() => {
                dispatch(setIsLoggedIn(true));
            })
            .finally(() => {
                dispatch(setIsInitialized(true));
            });
    };
};

export type AppInitActionsType =
    | ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setError>;
