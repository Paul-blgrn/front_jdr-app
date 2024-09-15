import {
    GET_BOARD_DETAILS_REQUEST,
    GET_BOARD_DETAILS_SUCCESS,
    GET_BOARD_DETAILS_FAILURE,
    CLEAR_BOARD_DETAILS,
} from '../actions/actionTypes'

const initialState = {
    board : {},
    loading: false,
    error: null,
}

const boardDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOARD_DETAILS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_BOARD_DETAILS_SUCCESS:
            return { ...state, loading: false, board: action.payload };
        case GET_BOARD_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload};
        case CLEAR_BOARD_DETAILS:
            return { ...state, loading: false, error: null, board: {} };
        default:
            return state;
    }
};

export default boardDetailsReducer;