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

    GET_BOARDS_REQUEST,
    GET_BOARDS_SUCCESS,
    GET_BOARDS_FAILURE,
} from '../actions/actionTypes'

const initialState = {
    created_boards: [],
    created_boards_meta: {},
    joined_boards: [],
    joined_boards_meta: {},
    loading: false,
    loadingCreated: false,
    loadingJoined: false,
    error: null,
}

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BOARD_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_BOARD_SUCCESS:
            return { ...state, loading: false, error: null };
        case CREATE_BOARD_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case GET_BOARDS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_BOARDS_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                created_boards: action.payload.created_boards,
                created_boards_meta: action.payload.created_boards_meta,
                joined_boards: action.payload.joined_boards,
                joined_boards_meta: action.payload.joined_boards_meta,
                error: null
            };
        case GET_BOARDS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case GET_CREATED_BOARDS_REQUEST:
            return { ...state, loadingCreated: true, error: null };
        case GET_CREATED_BOARDS_SUCCESS:
            return { 
                ...state, 
                loadingCreated: false,
                created_boards: action.payload.created_boards,
                created_boards_meta: action.payload.created_boards_meta,
                error: null
             };
        case GET_CREATED_BOARDS_FAILURE:
            return { ...state, loadingCreated: false, error: action.payload };

        case GET_JOINED_BOARDS_REQUEST:
            return { ...state, loadingJoined: true, error: null };
        case GET_JOINED_BOARDS_SUCCESS:
            return { 
                ...state, 
                loadingJoined: false,
                joined_boards: action.payload.joined_boards,
                joined_boards_meta: action.payload.joined_boards_meta,
                error: null
             };
        case GET_JOINED_BOARDS_FAILURE:
            return { ...state, loadingJoined: false, error: action.payload };

        case JOIN_BOARD_REQUEST:
            return { ...state, loading: true, error: null};
        case JOIN_BOARD_SUCCESS:
            return { ...state, loading: false, error: null };
        case JOIN_BOARD_FAILURE:
            return {...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default boardReducer;
