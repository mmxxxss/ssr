import axios from "axios";
import { withAuthHeader } from './token';

const server = axios.create({
    baseURL: 'http://8.130.30.150',
});

export const login = async (user) => {
    return server({
        method: 'post',
        url: '/api/sso/login',
        data: user,
    })
}

export const register = async (user) => {
    return server({
        method: 'post',
        url: '/api/sso/register',
        data: user,
    })
}

export const getUserAccount = async () => {
    return server(withAuthHeader({
        method: 'get',
        url: '/api/sso/account'
    }));
}
