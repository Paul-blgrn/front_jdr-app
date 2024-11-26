import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import configureMockStore from 'redux-mock-store';
import { thunk as thunkMiddleware } from 'redux-thunk';

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

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

const store = mockStore(initialState);

describe('App Component', () => {
  test('should render LoginPage for "/" route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Vérifier que la page Login est rendue
    expect(screen.getByPlaceholderText(/Entrez votre E-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Entrez votre mot de passe/i)).toBeInTheDocument();

    expect(screen.getByText(/Confirmer/i)).toBeInTheDocument();
    expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
  });
});