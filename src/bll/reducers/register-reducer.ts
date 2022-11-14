import { RegisterRequest } from '../../dal/registration-api';

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

export const setRegistration = (data: RegisterRequest) => {
    return { type: 'REGISTRATION', data };
};

type Register = ReturnType<typeof setRegistration>;
