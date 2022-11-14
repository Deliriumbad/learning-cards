import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

const message = `<div style="background-color: #fef2e4; color: #fd974f; padding: 15px">
     Please click on the following link for the password recovery:
      <a href='http://localhost:3000/Cards-study/#/setPass/$token$' 
      style="color: black; text-decoration: none; font-weight: bold">RECOVERY PASSWORD</a>
      </div>`;

export const registerApi = {
    register(data: RegisterRequestType) {
        return instance.post<any, RegisterResponseType, RegisterRequestType>('auth/register', data);
    },
    forgot(email: string) {
        return instance.post<any, ForgotPasswordResponseType, ForgotPasswordRequestType>(
            'auth/forgot',
            { email, from: '', message },
        );
    },
    setPassword(data: SetPasswordRequestType) {
        return instance.post<any, SetPasswordResponseType, SetPasswordRequestType>(
            'auth/set-new-password',
            data,
        );
    },
};

export type RegisterRequestType = {
    email: string;
    password: string;
};
export type RegisterResponseType = {
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

export type ForgotPasswordRequestType = {
    email: string;
    from: string;
    message: string;
};
export type ForgotPasswordResponseType = {
    data: {
        answer: boolean;
        html: boolean;
        info: string;
        success: boolean;
    };
};

export type SetPasswordRequestType = {
    password: string;
    resetPasswordToken: string;
};
export type SetPasswordResponseType = {
    data: {
        info: string;
        error: string;
    };
};
