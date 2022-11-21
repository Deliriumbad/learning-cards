import { AppThunk } from 'bll/store/store';
import forgotPasswordApi from 'dal/forgot-password-api';

export const newPassInitState = {
    isRedirect: false,
    email: '',
    error: null as null | string,
    isFetching: false,
};

export type NewPassStateType = typeof newPassInitState;

export type PasswordRecoveryActionsType =
    | ReturnType<typeof redirectToCheckEmail>
    | ReturnType<typeof setError>
    | ReturnType<typeof setEmail>
    | ReturnType<typeof isFetchingAC>;

export const forgotPassReducer = (
    state: NewPassStateType = newPassInitState,
    action: PasswordRecoveryActionsType,
): NewPassStateType => {
    switch (action.type) {
        case 'RECOVERY/SET_REDIRECT':
            return { ...state, isRedirect: true };
        case 'RECOVERY/SET_EMAIL':
            return { ...state, email: action.email };
        case 'RECOVERY/ERROR':
            return { ...state, error: action.error };
        case 'RECOVERY/IS_FETCHING':
            return { ...state, isFetching: action.isFetching };
        default:
            return state;
    }
};

export const redirectToCheckEmail = () => {
    return { type: 'RECOVERY/SET_REDIRECT' } as const;
};

export const setEmail = (email: string) => {
    return { type: 'RECOVERY/SET_EMAIL', email } as const;
};

export const setError = (error: string | null) => {
    return { type: 'RECOVERY/ERROR', error } as const;
};

export const isFetchingAC = (isFetching: boolean) =>
    ({ type: 'RECOVERY/IS_FETCHING', isFetching } as const);

export const requestForgotPassword = (email: string): AppThunk => {
    return async dispatch => {
        dispatch(isFetchingAC(true));
        try {
            await forgotPasswordApi.newPassword(email);
            dispatch(redirectToCheckEmail());
            dispatch(setEmail(email));
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
