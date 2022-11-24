import { authAPI } from '../../dal/auth-api';
import { AppThunk } from '../store/store';

import { isAuthUserData } from './login-reducer';

export const appInitState = {
    isInitialized: false,
    isLoading: false,
    error: null as null | string,
};

type InitStateType = typeof appInitState;

export const appReducer = (
    state: InitStateType = appInitState,
    action: AppInitActionsType,
): InitStateType => {
    switch (action.type) {
        case 'APP/SET_INITIALIZED':
            return { ...state, ...action.payload };
        case 'APP/SET_ERROR':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const setIsInitialized = (value: boolean) =>
    ({ type: 'APP/SET_INITIALIZED', payload: { isInitialized: value } } as const);
export const setIsLoading = (value: boolean) =>
    ({ type: 'APP/SET_IS_LOADING', payload: { isLoading: value } } as const);
export const setError = (value: null | string) =>
    ({ type: 'APP/SET_ERROR', payload: { error: value } } as const);

export const initialTC = (): AppThunk => {
    return dispatch => {
        authAPI
            .getAuth()
            .then(() => {
                dispatch(isAuthUserData());
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : `${e.message}, more details in the console`;
                dispatch(setError(error));
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
