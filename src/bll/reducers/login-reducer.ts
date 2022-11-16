import { authAPI, AuthResponseType, LoginParamsType } from '../../dal/auth-api';
import { AppDispatch } from '../store/store';

export const loginInitState = {
    user: {
        name: '',
        email: '',
        avatar: '',
    },
    id: '',
    emailError: null as null | string,
    isAuth: false,
};

export type LoginStateType = typeof loginInitState;

export type LoginActionType =
    | ReturnType<typeof setUserId>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setEmailError>;

export const loginReducer = (
    state: LoginStateType = loginInitState,
    action: LoginActionType,
): LoginStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return { ...state, user: action.payload, isAuth: true };
        case 'SET-USER-ID':
            return { ...state, id: action.userId };
        case 'SET-EMAIL-ERROR':
            return { ...state, emailError: action.error };
        default:
            return state;
    }
};

export const setAuthUserData = (payload: AuthResponseType) =>
    ({ type: 'SET_USER_DATA', payload } as const);
export const setUserId = (userId: string) => ({ type: 'SET-USER-ID', userId } as const);
export const setEmailError = (error: string | null) =>
    ({ type: 'SET-EMAIL-ERROR', error } as const);

export const loginTC = (data: LoginParamsType): AppDispatch => {
    return dispatch => {
        authAPI
            .login(data)
            .then(res => {
                dispatch(setAuthUserData(res));
                dispatch(setUserId(res._id));
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : `${e.message}, more details in the console`;
                dispatch(setEmailError(error));
            });
    };
};
