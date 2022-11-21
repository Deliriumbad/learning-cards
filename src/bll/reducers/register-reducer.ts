import registerApi from '../../dal/registration-api';
import { AppThunk } from '../store/store';

export const registerInitState = {
    newUser: {},
    isRegister: false,
    emailError: null as null | string,
    passwordError: null as null | string,
};

export type RegisterStateType = typeof registerInitState;

export type RegisterActionsType = ReturnType<typeof setRegistration> | ReturnType<typeof setError>;

export const registerReducer = (
    state: RegisterStateType = registerInitState,
    action: RegisterActionsType,
): RegisterStateType => {
    switch (action.type) {
        case 'REG/REGISTRATION':
            return { ...state, isRegister: true };
        case 'REG/SET_EMAIL_ERROR':
            return { ...state, emailError: action.error };
        default:
            return state;
    }
};

export const setRegistration = () => {
    return { type: 'REG/REGISTRATION' } as const;
};

export const setError = (error: string | null) => ({ type: 'REG/SET_EMAIL_ERROR', error } as const);

export const requestRegistration = (data: { email: string; password: string }): AppThunk => {
    return async dispatch => {
        try {
            await registerApi.register(data);
            dispatch(setRegistration());
        } catch (e: any) {
            const error = e.response
                ? e.response.data.error
                : `${e.message}, more details in the console`;
            dispatch(setError(error));
        }
    };
};
