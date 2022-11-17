import { AppThunk } from 'bll/store/store';
import newPasswordApi from 'dal/new-password-api';

export const newPassInitState = {
    isNewPassword: false,
};

export type PassRecoveryStateType = typeof newPassInitState;

type ActionType = NewPassword;

export const newPasswordReducer = (
    state: PassRecoveryStateType = newPassInitState,
    action: ActionType,
): PassRecoveryStateType => {
    switch (action.type) {
        case 'SET-NEW-PASSWORD':
            return { ...state, isNewPassword: true };
        default:
            return state;
    }
};

export const setNewPassword = () => {
    return { type: 'SET-NEW-PASSWORD' } as const;
};

export const setError = () => {
    return { type: 'SET-ERROR' } as const;
};
type NewPassword = ReturnType<typeof setNewPassword>;

export const requestNewPassword = (data: {
    password: string;
    resetPasswordToken: string | undefined;
}): AppThunk => {
    return async dispatch => {
        try {
            await newPasswordApi.newPassword(data);
            dispatch(setNewPassword);
        } catch (error: any) {
            dispatch(setError);
        }
    };
};
