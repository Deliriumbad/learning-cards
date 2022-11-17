import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});

const message = `<div style="background-color: #fef2e4; color: #fd974f; padding: 15px">
     Please click on the following link for the password recovery:
      <a href='http://localhost:3000/new-password/$token$' 
      style="color: black; text-decoration: none; font-weight: bold">RECOVERY PASSWORD</a>
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
