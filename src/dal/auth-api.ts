import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const authAPI = {
    login(data: LoginRequestType) {
        return instance.post<ResponseUserDataT>('auth/login', data);
    },
    logout() {
        return instance.delete('auth/me');
    },
    me() {
        return instance.post<ResponseUserDataT>('auth/me');
    },
    updateUserData(data: UserDataType) {
        return instance.put('auth/me', data).then(res => res.data);
    },
};

export type LoginRequestType = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export type UserDataType = {
    name: string;
    avatar: string;
};

export type ResponseUserDataT = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    publicCardPacksCount: number;

    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;

    error?: string;
};
