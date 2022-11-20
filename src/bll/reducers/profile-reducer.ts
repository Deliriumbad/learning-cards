import { authAPI, UserDataType } from '../../dal/auth-api';
import { AppDispatch } from '../store/store';

import { setEmailError } from './login-reducer';

export const profileInitState = {
    name: '',
    avatar: '',
};

export type ProfileStateType = typeof profileInitState;

export const profileReducer = (
    state: ProfileStateType = profileInitState,
    action: ActionType,
): ProfileStateType => {
    switch (action.type) {
        case 'PROFILE/UPDATE_PROFILE':
            return { ...state, name: action.name, avatar: action.avatar };
        default:
            return state;
    }
};
export const updateUserProfile = ({ name, avatar }: UserDataType) =>
    ({ type: 'PROFILE/UPDATE_PROFILE', name, avatar } as const);

export const updateUserProfileTC = (data: UserDataType): AppDispatch => {
    return dispatch => {
        authAPI
            .updateUserData(data)
            .then(res => {
                dispatch(updateUserProfile(res));
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : `${e.message}, more details in the console`;
                dispatch(setEmailError(error));
            });
    };
};

type ActionType = ReturnType<typeof updateUserProfile>;
