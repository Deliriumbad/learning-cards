import { authAPI } from '../../dal/auth-api';
import { AppDispatch, AppThunk } from '../store/store';

export const loginInitState = {
    user: {
        name: '',
        email: '',
        avatar: '',
    },
    isLoggedIn: false,
    id: '',
    emailError: null as null | string,
    isAuth: false,
    isFetching: false,
};

export type LoginStateType = typeof loginInitState;

export type LoginActionsType =
    | ReturnType<typeof setUserId>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setEmailError>
    | ReturnType<typeof logout>
    | ReturnType<typeof isFetchingAC>;

export const loginReducer = (
    state: LoginStateType = loginInitState,
    action: LoginActionsType,
): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SET_IS_LOGGED-IN':
            return { ...state, isLoggedIn: action.value };
        case 'LOGIN/SET_USER_ID':
            return { ...state, id: action.userId };
        case 'LOGIN/SET_EMAIL_ERROR':
            return { ...state, emailError: action.error };
        case 'LOGIN/LOGOUT':
            return { ...state, isAuth: false };
        case 'LOGIN/IS_FETCHING':
            return { ...state, isFetching: action.isFetching };
        default:
            return state;
    }
};

export const setIsLoggedIn = (value: boolean) =>
    ({ type: 'LOGIN/SET_IS_LOGGED-IN', value } as const);

export const setUserId = (userId: string) => ({ type: 'LOGIN/SET_USER_ID', userId } as const);

export const setEmailError = (error: string | null) =>
    ({ type: 'LOGIN/SET_EMAIL_ERROR', error } as const);

export const logout = () => ({ type: 'LOGIN/LOGOUT' } as const);

export const isFetchingAC = (isFetching: boolean) =>
    ({ type: 'LOGIN/IS_FETCHING', isFetching } as const);

export const requestLogin = (data: {
    email: string;
    password: string;
    rememberMe: boolean;
}): AppThunk => {
    return dispatch => {
        dispatch(isFetchingAC(true));
        authAPI
            .login(data)
            .then(() => {
                dispatch(setIsLoggedIn(true));
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : `${e.message}, more details in the console`;
                dispatch(setEmailError(error));
            })
            .finally(() => {
                dispatch(isFetchingAC(false));
            });
    };
};

export const logoutTC = (): AppDispatch => {
    return dispatch => {
        dispatch(isFetchingAC(true));
        authAPI
            .logout()
            .then(() => {
                dispatch(setIsLoggedIn(false));
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : `${e.message}, more details in the console`;
                dispatch(setEmailError(error));
            })
            .finally(() => {
                dispatch(isFetchingAC(false));
            });
    };
};

// export const getAuthUserData = (): AppThunk => {
//     return dispatch => {
//         dispatch(isFetchingAC(true));
//         authAPI
//             .me()
//             .then(res => {
//                 dispatch(setAuthUserData(res));
//             })
//             .catch(e => {
//                 const error = e.response
//                     ? e.response.data.error
//                     : `${e.message}, more details in the console`;
//                 console.error(error);
//             })
//             .finally(() => {
//                 dispatch(isFetchingAC(false));
//             });
//     };
// };
