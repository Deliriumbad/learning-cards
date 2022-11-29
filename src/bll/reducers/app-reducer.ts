import { AppThunk } from '../store/store';

import { getAuthUserData, setEmailError } from './login-reducer';

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

export const initialTC = (): AppThunk => async dispatch => {
    try {
        await dispatch(getAuthUserData());
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : `${e.message}, more details in the console`;
        dispatch(setEmailError(error));
    } finally {
        dispatch(setIsInitialized(true));
    }
};

export type AppInitActionsType =
    | ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setError>;
