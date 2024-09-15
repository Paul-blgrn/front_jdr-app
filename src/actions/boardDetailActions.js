import API from "../services/API";
import { DEBUG } from "../config/debug";


import {
    GET_BOARD_DETAILS_REQUEST,
    GET_BOARD_DETAILS_SUCCESS,
    GET_BOARD_DETAILS_FAILURE,
    CLEAR_BOARD_DETAILS,
} from './actionTypes';

export const getBoardById = (id) => async (dispatch) => {
    dispatch({ type: GET_BOARD_DETAILS_REQUEST });
    try {
        const response = await API.get(`/api/board/${id}`);
        //if (DEBUG && response) console.log('get board response = ', response);

        if (response) {
            const data  = response.data;
            if (DEBUG && data) console.log('data = ', data);
            dispatch({
                type: GET_BOARD_DETAILS_SUCCESS,
                payload: data,
            });
        } else {
            dispatch({ 
                type: GET_BOARD_DETAILS_FAILURE, 
                payload: response.data.message || '[redux-action-boardDetail]: Getting board failed. Please try again.',
            });
        }
    } catch (error) {
        if (DEBUG) console.error('[redux-action-boardDetail]: Error during getting board: ', error.response?.data || error.message);
        dispatch({ type: GET_BOARD_DETAILS_FAILURE, payload: error.response?.data || error.message });
    }
};

export const clearBoardDetails = () => async (dispatch) => {
    dispatch({ type: GET_BOARD_DETAILS_REQUEST });
    try {
        dispatch({ type: CLEAR_BOARD_DETAILS });
    } catch (error) {
        if (DEBUG) console.error('[redux-action-boardDetail] clearing token error : ', error);
    }
};
