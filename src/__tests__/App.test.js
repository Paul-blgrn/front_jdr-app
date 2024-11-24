import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';

const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware


// Reducer simulé pour les tests
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
    case 'LOGIN_USER_SUCCESS':
      return { ...state, isLoggedIn: true, user: action.payload.user };
    default:
      return state;
  }
};

const fetchUsers = () => {
  return function(dispatch) {

  }
}
// Création d'un store pour les tests
const mockStore = createStore(userReducer, applyMiddleware(thunkMiddleware));

describe('App Component', () => {
  test('should render LoginPage for "/" route', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Vérifier que le composant LoginPage est rendu pour la route "/"
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('should render ReadBoard for "/boards" route', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Accéder à la route "/boards"
    window.history.pushState({}, 'Boards page', '/boards');

    // Vérifier que le composant ReadBoard est rendu
    expect(screen.getByText(/Boards/i)).toBeInTheDocument();
  });

  test('should render DetailBoard for "/board/:id" route', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Accéder à une route dynamique "/board/:id"
    window.history.pushState({}, 'Board Detail page', '/board/1');

    // Vérifier que le composant DetailBoard est rendu
    expect(screen.getByText(/Board Detail/i)).toBeInTheDocument();
  });

  test('should render Templates for "/templates" route', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Accéder à la route "/templates"
    window.history.pushState({}, 'Templates page', '/templates');

    // Vérifier que le composant Templates est rendu
    expect(screen.getByText(/Templates/i)).toBeInTheDocument();
  });

  test('should render ErrorPage for unknown route', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Accéder à une route inconnue
    window.history.pushState({}, 'Error page', '/unknown');

    // Vérifier que le composant ErrorPage est rendu
    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
  });
});