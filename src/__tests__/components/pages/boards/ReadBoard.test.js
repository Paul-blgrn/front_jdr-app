import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ReadBoard from '../../../../components/pages/boards/ReadBoard'
import * as boardActions from '../../../../actions/boardActions';

// Mock des hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Création du store mock
const mockStore = configureStore([]);
const initialState = {
  user: { user: { id: 1 }, isLoggedIn: true },
  boards: {
    created_boards: [{ id: 1, name: 'Board 1', description: 'Description 1', users_count: 3, capacity: 5 }],
    created_boards_meta: { last_page: 2 },
    joined_boards: [],
    joined_boards_meta: { last_page: 1 },
    loading: false,
    loadingCreated: false,
    loadingJoined: false,
    error: null,
  },
};

// Mock pour navigate et dispatch
const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('ReadBoard', () => {
    it('should render without crashing', () => {
      render(<ReadBoard />);
      expect(screen.getByText(/Board/)).toBeInTheDocument();
    });
});

// describe('<ReadBoard />', () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore(initialState);
//     mockDispatch.mockClear();
//     mockNavigate.mockClear();
//   });

//   test('renders board titles correctly', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ReadBoard />
//         </BrowserRouter>
//       </Provider>
//     );

//     expect(screen.getByText(/Mes boards créés/i)).toBeInTheDocument();
//     expect(screen.getByText(/Boards Rejoints/i)).toBeInTheDocument();
//   });

//   test('renders "Create Board" and "Join Board" buttons', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ReadBoard />
//         </BrowserRouter>
//       </Provider>
//     );

//     expect(screen.getByText(/Créer un Board/i)).toBeInTheDocument();
//     expect(screen.getByText(/Rejoindre un Board/i)).toBeInTheDocument();
//   });

//   test('dispatches action to get created boards on load', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ReadBoard />
//         </BrowserRouter>
//       </Provider>
//     );

//     expect(mockDispatch).toHaveBeenCalledWith(boardActions.getCreatedBoards(1));
//   });

//   test('navigates to home if user is not logged in', () => {
//     const loggedOutState = {
//       ...initialState,
//       user: { user: null, isLoggedIn: false },
//     };
//     store = mockStore(loggedOutState);

//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ReadBoard />
//         </BrowserRouter>
//       </Provider>
//     );

//     expect(mockNavigate).toHaveBeenCalledWith('/');
//   });

//   test('displays loading message when loadingCreated is true', () => {
//     const loadingState = {
//       ...initialState,
//       boards: { ...initialState.boards, loadingCreated: true },
//     };
//     store = mockStore(loadingState);

//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ReadBoard />
//         </BrowserRouter>
//       </Provider>
//     );

//     expect(screen.getByText(/Chargement.../i)).toBeInTheDocument();
//   });

//   test('calls handleToggleCreateForm on Create Board button click', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ReadBoard />
//         </BrowserRouter>
//       </Provider>
//     );

//     const createBoardButton = screen.getByText(/Créer un Board/i);
//     fireEvent.click(createBoardButton);

//     // Vérifie si le formulaire de création est visible
//     expect(screen.getByText(/Créer un nouveau board/i)).toBeInTheDocument();
//   });

//   test('calls handleBoardClick on board card click', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ReadBoard />
//         </BrowserRouter>
//       </Provider>
//     );

//     const boardCard = screen.getByText('Board 1');
//     fireEvent.click(boardCard);

//     expect(mockNavigate).toHaveBeenCalledWith('/board/1');
//   });

//   test('updates currentCreatedPage on pagination button click', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <ReadBoard />
//         </BrowserRouter>
//       </Provider>
//     );

//     const nextPageButton = screen.getByRole('button', { name: /next/i });
//     fireEvent.click(nextPageButton);

//     expect(mockDispatch).toHaveBeenCalledWith(boardActions.getCreatedBoards(2));
//   });
// });
