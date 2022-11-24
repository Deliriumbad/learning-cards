import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

const registerApi = {
    register: (data: RegisterRequest) => {
        return instance.post<RegisterResponse>('auth/register', data);
    },
};

export type RegisterRequest = {
    email: string;
    password: string;
};

type RegisterResponse = {
    data: {
        addedUser: {
            created: string;
            email: string;
            isAdmin: boolean;
            name: string;
            publicCardPacksCount: number;
            rememberMe: boolean;
            updated: string;
            verified: boolean;
            __v: number;
            _id: string;
        };
        error?: string;
    };
};

export default registerApi;
