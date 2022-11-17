import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});

const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/learning-cards#/new-password/$token$'>
link</a>
</div>`;

const forgotPasswordApi = {
    newPassword: (email: string) => {
        return instance.post<NewPasswordResponse>('/auth/forgot', { email, message });
    },
};

type NewPasswordResponse = {
    info: string;
    error: string;
};

export default forgotPasswordApi;
