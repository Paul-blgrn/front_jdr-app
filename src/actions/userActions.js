import { persistor } from "../store/configureStore";
import API from "../services/API";
import Cookies from 'js-cookie';
import { DEBUG } from "../config/debug";

import { setToken, deleteToken } from "./tokenActions";

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  CHECK_SERVER_STATUS,
  SET_BEARER_TOKEN,
  REQUEST_BEARER_TOKEN_CLEAN,
  CHECKAUTH_USER_REQUEST,
  CLEAR_BOARDS,
  CLEAR_BOARD_DETAILS,
} from './actionTypes';

const getUserFromCookie = () => {
  const userDataJson = Cookies.get('user_data');
  return userDataJson ? JSON.parse(userDataJson) : null;
};

export const registerUser = (name, email, password, passwordConfirmation) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  try {
    // GET XSRF TOKEN
    await API.getCsrfToken();
    const response = await API.post('/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }, {
      withCredentials: true,
    });
    if (response.status === 200 || response.status === 204) {
      const {authenticated, user, token} = response.data;
      if (DEBUG) console.log('[redux-action]: Registration response:', response);
      if (DEBUG) console.log('[redux-action]: Registration user:', user);
      dispatch({ 
        type: REGISTER_USER_SUCCESS, 
        payload: { user },
      });
      dispatch({
        type: SET_BEARER_TOKEN,
        payload: { token },
      });
      if (DEBUG) console.log('[redux-action]: Registration successful !');
    } else {
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: response.data.message || '[redux-action]: Register failed. Please try again.',
      });
      persistor.purge();
    }
  } catch (error) {
    if (DEBUG) console.error('[redux-action]: Error during registration:', error.response?.data || error.message);
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.response?.data || error.message });
    persistor.purge();
  }
  
};

export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    try {
        await API.getCsrfToken();
        const response = await API.post('/login', {
            email,
            password,
        });
      if (response.status === 200 || response.status === 204) {
        const {authenticated, user, token} = response.data;
        console.log('User Data from Cookie:', user);
  
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: { user }
        });
        dispatch({
          type: SET_BEARER_TOKEN,
          payload: { token },
        });
        if (DEBUG) console.log('[redux-action]: Login successful');
      } else {
        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: response.data.message || '[redux-action]: Login failed. Please try again.',
        });
        persistor.purge();
      }
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: 'Login failed. Please try again.',
      });
      persistor.purge();
      if (DEBUG) console.error('[redux-action]: Login error = ', error);
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await API.post('/logout', {}, { withCredentials: true });
        dispatch({ type: LOGOUT_USER });
        dispatch({ type: REQUEST_BEARER_TOKEN_CLEAN });
        dispatch({ type: CLEAR_BOARDS });
        dispatch({ type: CLEAR_BOARD_DETAILS });
        persistor.purge().then(() => {
            console.log('[redux-action]: Redux-persist storage purged');
        }).catch(error => {
            console.error('[redux-action]: Error purging storage:', error);
        });
        if (DEBUG) console.info('[redux-action]: user is logged out.');
    } catch (error) {
        if (DEBUG) console.error('[redux-action]: Logout error:', error);
    }
};

export const checkAuth = () => async (dispatch) => {
  dispatch({ type: CHECKAUTH_USER_REQUEST });
  try {
      const response = await API.get('auth/check');
      // console.log('[redux-action]: response = ', response.data);
      const { authenticated, user } = response.data;
      if (authenticated && user) {
        // Utilisateur authentifié
        // console.log('[redux-action]: User Data from API = ', user);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: { user }
        });
        if (DEBUG) console.info('[redux-action]: User is logged in!');
      } else {
        // Utilisateur non authentifié
        dispatch({ type: LOGOUT_USER });
        dispatch({ type: REQUEST_BEARER_TOKEN_CLEAN });
        await persistor.purge();
        // persistor.purge().then(() => {
        //   console.log('[redux-action-auth]: Redux-persist storage purged');
        // }).catch(error => {
        //   console.error('[redux-action-auth]: Error purging storage:', error);
        // });
        if (DEBUG) console.info('[redux-action-auth]: User is not logged in, clearing local storage.');
      }
  } catch (error) {
    dispatch({ type: LOGOUT_USER });
    dispatch({ type: REQUEST_BEARER_TOKEN_CLEAN });
    await persistor.purge();
    // persistor.purge().then(() => {
    //   console.log('[redux-action]: Redux-persist storage purged after error');
    // }).catch(error => {
    //   console.error('[redux-action]: Error purging storage after error:', error);
    // });
    if (DEBUG) console.error('[redux-action]: Authentication check error:', error);
  }
};

export const checkServerStatus = () => async (dispatch) => {
    try {
      await API.get('/', { withCredentials: true });
      dispatch({ type: CHECK_SERVER_STATUS, payload: true });
    } catch (error) {
      if (DEBUG) console.error('[redux-action]: Server status check error:', error);
      dispatch({ type: CHECK_SERVER_STATUS, payload: false });
    }
  };
  