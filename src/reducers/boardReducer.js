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
    LEAVE_BOARD_REQUEST,
    LEAVE_BOARD_SUCCESS,
    LEAVE_BOARD_FAILURE,
    DELETE_BOARD_REQUEST,
    DELETE_BOARD_SUCCESS,
    DELETE_BOARD_FAILURE
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
    leaveStatus: null,
}

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        // Create Board
        case CREATE_BOARD_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_BOARD_SUCCESS:
            return { ...state, loading: false, error: null };
        case CREATE_BOARD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        // Join Board
        case JOIN_BOARD_REQUEST:
            return { ...state, loading: true, error: null};
        case JOIN_BOARD_SUCCESS:
            return { ...state, loading: false, error: null };
        case JOIN_BOARD_FAILURE:
            return {...state, loading: false, error: action.payload };
        // Get Created Boards
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
        // Get Joined Boards
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
        case CLEAR_BOARDS: 
            return { 
                ...state, 
                loading: false, 
                loadingCreated: false, 
                loadingJoined: false, 
                error: null, 
                created_boards: [], 
                created_boards_meta: {}, 
                joined_boards: [], 
                joined_boards_meta: {} 
            };
        case LEAVE_BOARD_REQUEST:
            return { ...state, leaveStatus: 'loading', loading: true, error: null };
        case LEAVE_BOARD_SUCCESS:
            return { ...state, leaveStatus: 'success', loading: false, error: null };
        case LEAVE_BOARD_FAILURE:
            return { ...state, leaveStatus: 'failure', loading: false, error: action.payload };
        case DELETE_BOARD_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_BOARD_SUCCESS:
            return { ...state, loading: false, error: null };
        case DELETE_BOARD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        // Default value
        default:
            return state;
    }
};

export default boardReducer;
