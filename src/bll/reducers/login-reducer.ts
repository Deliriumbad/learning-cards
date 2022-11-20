import { authAPI, AuthResponseType, LoginDataType } from '../../dal/auth-api';
import { AppDispatch, AppThunk } from '../store/store';

export const loginInitState = {
    user: {
        name: '',
        email: '',
        avatar: '',
    },
    id: '',
    emailError: null as null | string,
    isAuth: false,
    isFetching: false,
};

export type LoginStateType = typeof loginInitState;

export type LoginActionsType =
    | ReturnType<typeof setUserId>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setEmailError>
    | ReturnType<typeof logout>;

export const loginReducer = (
    state: LoginStateType = loginInitState,
    action: LoginActionsType,
): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SET_USER_DATA':
            return { ...state, user: action.payload, isAuth: true };
        case 'LOGIN/SET-USER-ID':
            return { ...state, id: action.userId };
        case 'LOGIN/SET-EMAIL-ERROR':
            return { ...state, emailError: action.error };
        case 'LOGIN/LOGOUT':
            return { ...state, isAuth: false };
        default:
            return state;
    }
};

export const setAuthUserData = (payload: AuthResponseType) =>
    ({ type: 'LOGIN/SET_USER_DATA', payload } as const);

export const setUserId = (userId: string) => ({ type: 'LOGIN/SET-USER-ID', userId } as const);

export const setEmailError = (error: string | null) =>
    ({ type: 'LOGIN/SET-EMAIL-ERROR', error } as const);

export const logout = () => ({ type: 'LOGIN/LOGOUT' } as const);

export const loginTC = (data: LoginDataType): AppThunk => {
    return dispatch => {
        authAPI
            .login(data)
            .then(res => {
                dispatch(setAuthUserData(res));
                dispatch(setUserId(res._id));
                dispatch(setEmailError(null));
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : `${e.message}, more details in the console`;
                dispatch(setEmailError(error));
            });
    };
};

export const logoutTC = (): AppDispatch => {
    return dispatch => {
        authAPI
            .logout()
            .then(() => {
                dispatch(logout());
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : `${e.message}, more details in the console`;
                dispatch(setEmailError(error));
            });
    };
};

export const isAuthUserData = (): AppDispatch => {
    return dispatch => {
        authAPI
            .getAuth()
            .then(res => {
                dispatch(setAuthUserData(res));
                dispatch(setUserId(res._id));
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : `${e.message}, more details in the console`;
                dispatch(setEmailError(error));
            })
            .finally(() => {
                dispatch(setEmailError(null));
            });
    };
};
