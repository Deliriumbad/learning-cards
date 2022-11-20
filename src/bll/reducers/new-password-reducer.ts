import newPasswordApi from 'dal/new-password-api';

import { AppThunk } from '../store/store';

export const newPassInitState = {
    isNewPassword: false,
    isFetching: false,
    error: null as null | string,
};

export type PassRecoveryStateType = typeof newPassInitState;

export type NewPasswordActionsType =
    | ReturnType<typeof setNewPassword>
    | ReturnType<typeof setError>;

export const newPasswordReducer = (
    state: PassRecoveryStateType = newPassInitState,
    action: NewPasswordActionsType,
): PassRecoveryStateType => {
    switch (action.type) {
        case 'NEW/SET-NEW-PASSWORD':
            return { ...state, isNewPassword: true };
        case 'NEW/SET-ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export const setNewPassword = () => {
    return { type: 'NEW/SET-NEW-PASSWORD' } as const;
};

export const setError = (error: string | null) => {
    return { type: 'NEW/SET-ERROR', error } as const;
};

export const requestNewPassword = (data: {
    password: string;
    resetPasswordToken: string | undefined;
}): AppThunk => {
    return async dispatch => {
        try {
            await newPasswordApi.newPassword(data);
            dispatch(setNewPassword);
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : `${e.message}, more details in the console`;
            dispatch(setError(error));
        }
    };
};
