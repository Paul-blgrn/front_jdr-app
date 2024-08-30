import axios from 'axios';
import { deleteAllCookies } from '../utils/cookieManager';
import { logoutUser } from '../actions/userActions';

import { store } from '../store/configureStore';
import { useDispatch } from 'react-redux';

import { DEBUG } from '../config/debug';

const pendingRequests = new Map();

const API = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
        "X-Requested-With": 'XMLHttpRequest',
        'Accept': 'application/json',
        'Authorization': `Bearer ${store.getState().token.token}`,
    },
});

// Génère une clé unique pour chaque requête en utilisant l'URL, les paramètres, et les données
function generateRequestKey(config) {
    const { method, url, params, data } = config;
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('|');
}

// Intercepteur de requête
API.interceptors.request.use(
    config => {
        const requestKey = generateRequestKey(config);
        console.log(`[REQUEST API] Checking request key: ${requestKey}`);

        // Vérification de la requête en cours
        if (pendingRequests.has(requestKey)) {
            // Requête déjà en cours, on annule
            if (DEBUG) console.log(`[REQUEST API] Duplicate request detected: ${requestKey}`);
            return Promise.reject({ message: 'Duplicate request', config });
        }

        // Ajout du token CSRF pour les méthodes sensibles
        const methodsToProtect = ['post', 'put', 'delete', 'patch'];
        const token = getCookie('XSRF-TOKEN');

        if (methodsToProtect.includes(config.method) && token) {
            config.headers['X-XSRF-TOKEN'] = token; // Ajouter automatiquement le token CSRF si disponible
        }

        // Ajout du token d'authentification
        config.headers['Authorization'] = `Bearer ${store.getState().token.token}`;

        // Ajout de la requête à la liste des requêtes en cours
        pendingRequests.set(requestKey, config);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Intercepteur de réponse
API.interceptors.response.use(
    (response) => {
        const requestKey = generateRequestKey(response.config);
        console.log(`[RESPONSE API] Removing request key: ${requestKey}`);
        // Suppression de la requête de la liste une fois terminée
        pendingRequests.delete(requestKey);
        return response;
    },
    (error) => {
        const requestKey = generateRequestKey(error.config || {});
        console.log(`[RESPONSE ERROR] Removing request key: ${requestKey}`);
        // Suppression de la requête de la liste en cas d'erreur
        pendingRequests.delete(requestKey);
        return Promise.reject(error);
    }
);

API.getCsrfToken = async () => {
    try {
        const response = await API.get('/sanctum/csrf-cookie');
        console.log('[API]: CSRF token response:', response);
        const token = getCookie('XSRF-TOKEN');
        if (token) {
            console.log('[API]: CSRF token fetched successfully !');
            return token;
        } else {
            console.error('[API]: CSRF token not found in response');
            throw new Error('CSRF token not found');
        }
    } catch (error) {
        console.error('[API]: Error fetching CSRF token \n', error);
        throw error;
    }
};

// Response interceptor to handle errors
// API.interceptors.response.use(
//     response => response,
//     error => {
//         if (!error.response) {
//             // Erreur réseau (par exemple, perte de connexion)
//             console.error('[API]: Network error:', error.message);
//             //handleLogout();
//         } else if (error.response.status === 401) {
//             // Erreur d'authentification
//             //handleLogout(); // Assurez-vous que cette fonction est définie et importée
//         } else if (error.response.status === 500) {
//             // Erreur du serveur
//             console.error('[API]: Server error:', error.response.data.message || 'An unexpected error occurred.');
//             //handleLogout();
//         } else {
//             // Autres erreurs
//             console.error('[API]: Error response:', error.response);
//             //handleLogout();
//         }
//         return Promise.reject(error);
//     }
// );

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('Le nom du cookie doit être une chaîne non vide.');
    }

    const cookieName = encodeURIComponent(name) + "=";
    const cookies = document.cookie ? document.cookie.split(';') : [];

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName)) {
            return decodeURIComponent(cookie.substring(cookieName.length));
        }
    }
    return null;
}

const handleLogout = async () => {
    deleteAllCookies('127.0.0.1', '/');
    store.dispatch(logoutUser());
    console.info('[API]: User tokens and cookies have been removed.');
};

export default API;