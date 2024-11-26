import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { thunk as Thunk} from 'redux-thunk';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ReadBoard from '../../../../components/pages/boards/ReadBoard';

// Mock des actions Redux
jest.mock('../../../../actions/boardActions', () => ({
  getCreatedBoards: jest.fn(() => ({ type: 'GET_CREATED_BOARDS_REQUEST' })),
  getJoinedBoards: jest.fn(() => ({ type: 'GET_JOINED_BOARDS_REQUEST' })),
}));

// Mock de useNavigate
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(() => jest.fn()),
  };
});

const mockStore = configureMockStore([Thunk]);

describe('ReadBoard Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        user: { id: 1, name: 'Test User', email: 'test@test.f' }, // Simule un utilisateur connecté
        isLoggedIn: true,
      },
      boards: {
        created_boards: [
          { id: 1, name: 'Board 1', description: 'Description 1', users_count: 5, capacity: 10 },
          { id: 2, name: 'Board 2', description: 'Description 2', users_count: 2, capacity: 8 },
        ],
        joined_boards: [
          { id: 3, name: 'Board 3', description: 'Description 3', users_count: 8, capacity: 10 },
        ],
        created_boards_meta: { last_page: 1 },
        joined_boards_meta: { last_page: 1 },
        loadingCreated: false,
        loadingJoined: false,
      },
    });
  });

  it('renders correctly for a logged-in user', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/boards']}>
          <ReadBoard />
        </MemoryRouter>
      </Provider>
    );

    // Vérifiez que les titres sont présents
    expect(screen.getByText(/Mes boards créés/i)).toBeInTheDocument();
    expect(screen.getByText(/Boards Rejoints/i)).toBeInTheDocument();

    // Vérifiez qu'un board créé est affiché
    expect(screen.getByText(/Board 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument();

    // Vérifiez qu'un board rejoint est affiché
    expect(screen.getByText(/Board 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 3/i)).toBeInTheDocument();
  });
});