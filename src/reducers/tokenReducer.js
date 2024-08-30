import {
    REQUEST_BEARER_TOKEN,
    SET_BEARER_TOKEN,
    BEARER_TOKEN_FAILURE,
    REQUEST_BEARER_TOKEN_CLEAN
    ,
} from '../actions/actionTypes'

const initialState = {
    token: null,
    loading: false,
    error: null,
};

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_BEARER_TOKEN:
            return {...state, loading: true, error: null};
        case SET_BEARER_TOKEN:
            return { ...state, loading: false, token: action.payload.token, error: null};
        case BEARER_TOKEN_FAILURE:
            return {...state, loading: false, error: action.payload};
        case REQUEST_BEARER_TOKEN_CLEAN:
            return {... state, loading: false, token: null, error: null};
        default:
            return state;
    }
};

export default tokenReducer;