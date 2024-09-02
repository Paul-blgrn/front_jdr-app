// AUTH ACTIONS
// login
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

// logout
export const CHECKAUTH_USER_REQUEST = 'CHECKAUTH_USER_REQUEST';
export const LOGOUT_USER = 'LOGOUT_USER';

// REGISTER ACTIONS
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

// BOARD ACTIONS
export const CREATE_BOARD_REQUEST = 'CREATE_BOARD_REQUEST';
export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS';
export const CREATE_BOARD_FAILURE = 'CREATE_BOARD_FAILURE';

export const JOIN_BOARD_REQUEST = 'JOIN_BOARD_REQUEST';
export const JOIN_BOARD_SUCCESS = 'JOIN_BOARD_SUCCESS';
export const JOIN_BOARD_FAILURE = 'JOIN_BOARD_FAILURE';

export const GET_CREATED_BOARDS_REQUEST = 'GET_CREATED_BOARDS_REQUEST';
export const GET_CREATED_BOARDS_SUCCESS = 'GET_CREATED_BOARDS_SUCCESS';
export const GET_CREATED_BOARDS_FAILURE = 'GET_CREATED_BOARDS_FAILURE';

export const GET_JOINED_BOARDS_REQUEST = 'GET_JOINED_BOARDS_REQUEST';
export const GET_JOINED_BOARDS_SUCCESS = 'GET_JOINED_BOARDS_SUCCESS';
export const GET_JOINED_BOARDS_FAILURE = 'GET_JOINED_BOARDS_FAILURE';

export const GET_BOARDS_REQUEST = 'GET_BOARDS_REQUEST';
export const GET_BOARDS_SUCCESS = 'GET_BOARDS_SUCCESS';
export const GET_BOARDS_FAILURE = 'GET_BOARDS_FAILURE';

// OTHER ACTIONS
export const CHECK_SERVER_STATUS = 'CHECK_SERVER_STATUS';

export const REQUEST_BEARER_TOKEN = 'REQUEST_BEARER_TOKEN';
export const SET_BEARER_TOKEN = 'SET_BEARER_TOKEN';
export const BEARER_TOKEN_FAILURE = 'BEARER_TOKEN_FAILURE';
export const REQUEST_BEARER_TOKEN_CLEAN = 'REQUEST_BEARER_TOKEN_CLEAN';