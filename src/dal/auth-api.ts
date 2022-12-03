import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const authAPI = {
    login(data: LoginRequestType) {
        return instance.post<LoginResponseType>('auth/login', data);
    },
    logout() {
        return instance.delete('auth/me');
    },
    me() {
        return instance.post<MeResponseT>('auth/me');
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

export type LoginResponseType = {
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
    error?: string;
};

type MeResponseT = LoginResponseType;
