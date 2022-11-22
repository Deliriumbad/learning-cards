import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post<AuthResponseType>('/auth/login', data).then(res => res.data);
    },
    logout() {
        return instance.delete('/auth/me').then(res => res.data);
    },
    getAuth() {
        return instance.post<AuthResponseType>('auth/me').then(res => res.data);
    },
    updateUserData(data: UserDataType) {
        return instance.put<AuthResponseType>('auth/me', data).then(res => res.data);
    },
};

export type LoginDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export type UserDataType = {
    name: string;
    avatar: string;
};

export type AuthResponseType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
    token: string;
    tokenDeathTime: number;
    avatar: string;
    error: string;
};
