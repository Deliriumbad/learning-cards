import { AppDispatch } from 'bll/store/store';
import forgotPasswordApi from 'dal/forgot-password-api';

export const newPassInitState = {
    isRedirect: false,
    email: '',
};

export type NewPassStateType = typeof newPassInitState;

type ActionType = Forgot;

const forgotPassReducer = (
    state: NewPassStateType = newPassInitState,
    action: ActionType,
): NewPassStateType => {
    switch (action.type) {
        case 'SET-REDIRECT':
            return { ...state, isRedirect: true };
        case 'SET-EMAIL':
            return { ...state, email: action.email };
        default:
            return state;
    }
};

export const redirectToCheckEmail = () => {
    return { type: 'SET-REDIRECT' } as const;
};
export const setEmail = (email: string) => {
    return { type: 'SET-EMAIL', email } as const;
};
export const setError = (message: string) => {
    return { type: 'ERROR', message } as const;
};

export const requestForgotPassword = (email: string): AppDispatch => {
    return async dispatch => {
        try {
            await forgotPasswordApi.newPassword(email);
            dispatch(redirectToCheckEmail());
            dispatch(setEmail(email));
        } catch (error: any) {
            dispatch(setError(error));
        }
    };
};

type Forgot =
    | ReturnType<typeof redirectToCheckEmail>
    | ReturnType<typeof setError>
    | ReturnType<typeof setEmail>;

export default forgotPassReducer;
