import axios from "axios";
import { withAuthHeader } from '../token';

const server = axios.create({
    baseURL: 'http://8.130.87.194/',
    withCredentials: true,
});

export const login = async (user) => {
    return server({
        method: 'post',
        url: '/api/login',
        data: user,
    })
}

export const register = async (user) => {
    return server({
        method: 'post',
        url: '/api/register',
        data: user,
    })
}

export const logout = async () => {
    return server({
        method: 'post',
        url: '/api/logout',
    })
}

export const getUserAccount = async (user_id) => {
    return server({
        method: 'get',
        url: `/api/profile?user_id=${user_id}`
    });
}
