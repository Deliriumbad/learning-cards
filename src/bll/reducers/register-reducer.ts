import { Dispatch } from 'redux';

import registerApi, { RegisterRequest } from '../../dal/registration-api';

export const registerInitState = {};

export type RegisterStateType = typeof registerInitState;

export type RegisterActionType = Register;

export const registerReducer = (
    state: RegisterStateType = registerInitState,
    action: RegisterActionType,
): RegisterStateType => {
    switch (action.type) {
        case 'REGISTRATION':
            return { ...state };
        default:
            return state;
    }
};

export const setRegistration = (isRegistered: boolean) => {
    return { type: 'REGISTRATION', isRegistered } as const;
};

export const setError = (message: string) => {
    return { type: 'ERROR', message } as const;
};

type Register = ReturnType<typeof setRegistration>;

export const requestRegistration = (data: RegisterRequest) => {
    async (dispatch: Dispatch) => {
        try {
            await registerApi.register(data);
            dispatch(setRegistration(true));
        } catch (error: any) {
            dispatch(setRegistration(error.message));
        }
    };
};
