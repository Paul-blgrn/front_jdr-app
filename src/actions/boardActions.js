import API from "../services/API";
import { DEBUG } from "../config/debug";

import {
    CREATE_BOARD_REQUEST,
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAILURE,

    JOIN_BOARD_REQUEST,
    JOIN_BOARD_SUCCESS,
    JOIN_BOARD_FAILURE,

    GET_CREATED_BOARDS_REQUEST,
    GET_CREATED_BOARDS_SUCCESS,
    GET_CREATED_BOARDS_FAILURE,

    GET_JOINED_BOARDS_REQUEST,
    GET_JOINED_BOARDS_SUCCESS,
    GET_JOINED_BOARDS_FAILURE,

    CLEAR_BOARDS,
} from "./actionTypes";

export const createBoard = (name, description, capacity) => async (dispatch) => {
    dispatch({ type: CREATE_BOARD_REQUEST });
    try {
        // GET CSRF TOKEN
        await API.getCsrfToken();
        const response = await API.post('/api/boards/add', {
            name,
            description,
            capacity
        });
        if (DEBUG) console.log('response = ', response)
        if (response.status === 201) {
            const board = response.data.board;
            dispatch({
                type: CREATE_BOARD_SUCCESS,
                payload: { board },
            })
            dispatch(getCreatedBoards());
        } else {
            dispatch({
                type: CREATE_BOARD_FAILURE,
                payload: response.data.message || '[redux-action-boards]: Crating board failed. Please try again.',
            });
        }
    } catch (error) {
        if (DEBUG) console.error('[redux-action-boards]: Error during Creating board: ', error.response?.data || error.message);
        dispatch({ type: CREATE_BOARD_FAILURE, payload: error.response?.data || error.message });
    }
};

export const joinBoard = (code) => async (dispatch) => {
    dispatch({ type: JOIN_BOARD_REQUEST });
    try {
        await API.getCsrfToken();
        const response = await API.post('/api/boards/join', {
            code,
        });
        if (DEBUG) console.log('response = ', response)
        if (response.status === 201) {
            const { boards , meta } = response.data;
            dispatch({
                type: JOIN_BOARD_SUCCESS,
                payload: { boards: boards, meta: meta },
            })
            dispatch(getJoinedBoards());
        } else {
            dispatch({
                type: JOIN_BOARD_FAILURE,
                payload: response.data.message || '[redux-action-boards]: Crating board failed. Please try again.',
            });
        }
    } catch (error) {
        if (DEBUG) console.error('[redux-action-boards]: Error during Joining board: ', error.response?.data || error.message);
        dispatch({ type: JOIN_BOARD_FAILURE, payload: error.response?.data || error.message });
    }
};

// export const getBoards = (createdPage = 1, joinedPage = 1) => async (dispatch) => {
//     dispatch({ type: GET_BOARDS_REQUEST });
//     try {
//         // Récupérer les boards créés
//         const response = await API.get(`/api/boards?created_page=${createdPage}&joined_page=${joinedPage}`);
//         //console.log('response boards = ', response);
//         //const response = await API.get(`/api/boards?page=${page}`);
//         const { data, meta } = response.data;
//         if (data && meta) {
//             //console.log('[redux-action-boards] response | DATA = ', data, ' META = ', meta);
//             dispatch({
//                 type: GET_BOARDS_SUCCESS,
//                 payload: { 
//                     created_boards: data.created_boards,
//                     created_boards_meta: meta.created_boards,
//                     joined_boards: data.joined_boards,
//                     joined_boards_meta: meta.joined_boards,
//                 },
//             })
//         } else {
//             dispatch({ type: GET_BOARDS_FAILURE });
//         }
//     } catch (error) {
//         dispatch({ type: GET_BOARDS_FAILURE, payload: error.message || '[redux-action-boards]: An error occurred while get boards'});
//     }
// };

export const getCreatedBoards = (createdPage) => async (dispatch) => {
    dispatch({ type: GET_CREATED_BOARDS_REQUEST });
    try {
        const response = await API.get(`/api/boards?created_page=${createdPage}`);
        const { data, meta } = response.data;
        //console.log('[redux-action-boards: CREATED BOARDS = ] ', response);
        if (data && meta) {
            dispatch({
                type: GET_CREATED_BOARDS_SUCCESS,
                payload: {
                    created_boards: data.created_boards,
                    created_boards_meta: meta.created_boards,
                }
            });
        } else {
            dispatch({
                type: GET_CREATED_BOARDS_FAILURE
            });
        }
    } catch (error) {
        dispatch({
            type: GET_CREATED_BOARDS_FAILURE,
            payload: error.message || '[redux-action-boards]: An error occurred while get created boards'
        });
    }
};

export const getJoinedBoards = (joinedPage) => async (dispatch) => {
    dispatch({ type: GET_JOINED_BOARDS_REQUEST });
    try {
        const response = await API.get(`/api/boards?joined_page=${joinedPage}`);
        const { data, meta } = response.data;
        if (data && meta) {
            dispatch({
                type: GET_JOINED_BOARDS_SUCCESS,
                payload: {
                    joined_boards: data.joined_boards,
                    joined_boards_meta: meta.joined_boards,
                }
            });
        } else {
            dispatch({
                type: GET_JOINED_BOARDS_FAILURE
            });
        }
    } catch (error) {
        dispatch({
            type: GET_JOINED_BOARDS_FAILURE,
            payload: error.message || '[redux-action-boards]: An error occurred while get joined boards'
        });
    }
};


export const clearBoards = () => async (dispatch) => {
    dispatch({ type: GET_JOINED_BOARDS_REQUEST });
    try {
        dispatch({ type: CLEAR_BOARDS });
    } catch (error) {
        dispatch({
            type: GET_JOINED_BOARDS_FAILURE,
            payload: error.message || '[redux-action-boards]: An error occurred while clearing boards'
        });
    }
};
