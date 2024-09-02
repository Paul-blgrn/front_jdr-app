import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    CHECK_SERVER_STATUS,
    CHECKAUTH_USER_REQUEST,
} from '../actions/actionTypes'

const initialState = {
    user: null,
    isLoggedIn: false,
    isRegistering: false,
    isModeAdmin: false,
    isServerOnline: true,
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case CHECKAUTH_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, isLoggedIn: true };
        case LOGIN_USER_FAILURE:
            return { ...state, loading: false, error: action.payload, isLoggedIn: false };
        case LOGOUT_USER:
            return { ...state, loading: false, user: null, isLoggedIn: false, error: null };
        case REGISTER_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, isLoggedIn: true };
        case REGISTER_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case CHECK_SERVER_STATUS:
            return { ...state, isServerOnline: action.payload };
        default:
            return state;
    }
};

export default userReducer;