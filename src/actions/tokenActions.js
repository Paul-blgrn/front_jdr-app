import { persistor } from "../store/configureStore";
import API from "../services/API";
import Cookies from 'js-cookie';
import { DEBUG } from "../config/debug";

import {
    REQUEST_BEARER_TOKEN,
    SET_BEARER_TOKEN,
    BEARER_TOKEN_FAILURE,
    REQUEST_BEARER_TOKEN_CLEAN,
} from './actionTypes';

export const setToken = (token) => async (dispatch) => {
    dispatch({ type: REQUEST_BEARER_TOKEN });
    try {
        if (DEBUG) console.info('[redux-action]: Token data from API = ', token);
        dispatch({
            type: SET_BEARER_TOKEN,
            payload: { token },
        });
    } catch (error) {
        dispatch({ type: BEARER_TOKEN_FAILURE });
        persistor.purge().then(() => {
            console.log('[redux-action-BEARER]: Redux-persist storage purged');
        }).catch(error => {
            console.error('[redux-action-BEARER]: Error purging storage:', error);
        });
        if (DEBUG) console.error('[redux-action] Bearer token error : ', error);
    }
};

export const deleteToken = () => async (dispatch) => {
    dispatch({ type: REQUEST_BEARER_TOKEN });
    try {
        persistor.purge().then(() => {
            console.log('[redux-action]: Redux-persist token purged');
        }).catch(error => {
            console.error('[redux-action]: Error purging token:', error);
        });
        dispatch({ type: REQUEST_BEARER_TOKEN_CLEAN });
    } catch (error) {
        if (DEBUG) console.error('[redux-action] delete token error : ', error);
    }
};