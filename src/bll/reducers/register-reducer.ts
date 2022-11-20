import registerApi from '../../dal/registration-api';
import { AppDispatch } from '../store/store';

export const registerInitState = {
    isRegister: false,
};

export type RegisterStateType = typeof registerInitState;

export type RegisterActionType = Register;

export const registerReducer = (
    state: RegisterStateType = registerInitState,
    action: RegisterActionType,
): RegisterStateType => {
    switch (action.type) {
        case 'REGISTRATION':
            return { ...state, isRegister: true };
        default:
            return state;
    }
};

export const setRegistration = () => {
    return { type: 'REGISTRATION' } as const;
};

export const setError = (message: string) => {
    return { type: 'ERROR', message } as const;
};

type Register = ReturnType<typeof setRegistration>;

export const requestRegistration = (data: { email: string; password: string }): AppDispatch => {
    return async dispatch => {
        try {
            await registerApi.register(data);
            dispatch(setRegistration());
        } catch (error: any) {
            dispatch(setError);
        }
    };
};
