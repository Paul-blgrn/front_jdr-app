// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// import { persistStore } from 'redux-persist';
// import { createStore, applyMiddleware } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';


// export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
// export const CHECKAUTH_USER_REQUEST = 'CHECKAUTH_USER_REQUEST';
// export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
// export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
// export const LOGOUT_USER = 'LOGOUT_USER';
// export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
// export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
// export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
// export const CHECK_SERVER_STATUS = 'CHECK_SERVER_STATUS';

// // Mock de redux-persist
// jest.mock('redux-persist/integration/react', () => ({
//   PersistGate: ({ children }) => <div>{children}</div>,
// }));

//jest.mock('redux-thunk', () => ({ middleware: (store) => (next) => (action) => next(action) }));

// // Mock du module redux-persist storage
// jest.mock('redux-persist', () => ({
//   persistReducer: jest.fn().mockImplementation((config, reducer) => {
//     return (state, action) => {
//       const persistedState = mockedStorage[config.key];
//       const initialState = persistedState ? JSON.parse(persistedState) : state;
//       return reducer(initialState || {}, action);
//     };
//   }),
//   persistStore: jest.fn(),
//   getStoredState: jest.fn(),
//   storage: {
//     getItem: jest.fn((key) => mockedStorage[key] || null),
//     setItem: jest.fn((key, value) => {
//       mockedStorage[key] = value;
//     }),
//     removeItem: jest.fn((key) => {
//       delete mockedStorage[key];
//     }),
//   },
// }));

// // Mock pour l'objet `storage` utilisé dans redux-persist
// const mockedStorage = {
//   'persist:user': JSON.stringify({ user: { isLoggedIn: false } }),
// };

// Reducer simulé
// const initialState = {
//   user: null,
//   isLoggedIn: false,
//   loading: false,
//   error: null,
// };

// const mockReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_USER_REQUEST:
//         return { ...state, loading: true, error: null };
//     case CHECKAUTH_USER_REQUEST:
//         return { ...state, loading: true, error: null };
//     case LOGIN_USER_SUCCESS:
//         return { ...state, loading: false, user: action.payload.user, isLoggedIn: true };
//     case LOGIN_USER_FAILURE:
//         return { ...state, loading: false, error: action.payload, isLoggedIn: false };
//     case LOGOUT_USER:
//         return { ...state, loading: false, user: null, isLoggedIn: false, error: null };
//     case REGISTER_USER_REQUEST:
//         return { ...state, loading: true, error: null };
//     case REGISTER_USER_SUCCESS:
//         return { ...state, loading: false, user: action.payload.user, isLoggedIn: true };
//     case REGISTER_USER_FAILURE:
//         return { ...state, loading: false, error: action.payload };
//     case CHECK_SERVER_STATUS:
//         return { ...state, isServerOnline: action.payload };
//     default:
//         return state;
//   }
// };

// export const mockStore = configureStore({
//     reducer: mockReducer,
//     preloadedState: initialState,
// });

afterEach(() => {
  jest.clearAllMocks(); // Reset mocks after every test
});