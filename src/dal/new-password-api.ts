import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

const newPasswordApi = {
    newPassword: (data: NewPasswordRequest) => {
        return instance.post<NewPasswordResponse>('/auth/set-new-password', data);
    },
};

export type NewPasswordRequest = {
    password: string;
    resetPasswordToken: string | undefined;
};

export type NewPasswordResponse = {
    info: string;
    error: string;
};

export default newPasswordApi;
