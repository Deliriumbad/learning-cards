import { authAPI, ResponseUserDataT } from '../../dal/auth-api';
import { AppDispatch, AppThunk } from '../store/store';

export const loginInitState = {
    userData: {
        _id: '',
        email: 'nya-admin@nya.nya',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,

        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: false,

        error: '',
    },
    isLoggedIn: false,
    emailError: null as null | string,
    isAuth: false,
    isFetching: false,
};

export type LoginStateType = typeof loginInitState;

export type LoginActionsType =
    | ReturnType<typeof setUserData>
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
        case 'LOGIN/SET_USER_DATA':
            return { ...state, userData: { ...state.userData, ...action.userData } };
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

export const setUserData = (userData: ResponseUserDataT) =>
    ({ type: 'LOGIN/SET_USER_DATA', userData } as const);

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
            .then(response => {
                dispatch(setUserData(response.data));
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
