import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<AuthResponseType>('/auth/login', data).then(res => res.data);
    },
    getAuth() {
        return instance.post<AuthResponseType>('auth/me');
    },
};

export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
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
