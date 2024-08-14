import axios from 'axios';
import { getCookie } from '../utils/cookieManager';

axios.defaults.withCredentials = true;

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    },
});

API.setAuthToken = (token) => {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

API.interceptors.request.use(config => {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export const getCsrfToken = async () => {
    try {
        await API.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
};

export default API;