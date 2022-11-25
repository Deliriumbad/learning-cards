import newPasswordApi from 'dal/new-password-api';

import { AppThunk } from '../store/store';

export const newPassInitState = {
    isNewPassword: false,
    isFetching: false,
    error: null as null | string,
};

export type PassRecoveryStateType = typeof newPassInitState;

export const newPasswordReducer = (
    state: PassRecoveryStateType = newPassInitState,
    action: NewPasswordActionsType,
): PassRecoveryStateType => {
    switch (action.type) {
        case 'NEW/SET_NEW_PASSWORD':
            return { ...state, isNewPassword: true };
        case 'NEW/SET_ERROR':
            return { ...state, error: action.error };
        case 'NEW/IS_FETCHING':
            return { ...state, isFetching: action.isFetching };
        default:
            return state;
    }
};

export const setNewPassword = () => {
    return { type: 'NEW/SET_NEW_PASSWORD' } as const;
};

export const setError = (error: string | null) => {
    return { type: 'NEW/SET_ERROR', error } as const;
};

export const isFetchingAC = (isFetching: boolean) =>
    ({ type: 'NEW/IS_FETCHING', isFetching } as const);

export const requestNewPassword = (data: {
    password: string;
    resetPasswordToken: string | undefined;
}): AppThunk => {
    return async dispatch => {
        dispatch(isFetchingAC(true));
        try {
            await newPasswordApi.newPassword(data);
            dispatch(setNewPassword);
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : `${e.message}, more details in the console`;
            dispatch(setError(error));
        } finally {
            dispatch(isFetchingAC(false));
        }
    };
};

export type NewPasswordActionsType =
    | ReturnType<typeof setNewPassword>
    | ReturnType<typeof setError>
    | ReturnType<typeof isFetchingAC>;
