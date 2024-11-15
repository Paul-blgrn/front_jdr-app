import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../components/pages/error/ErrorPage'; // Assurez-vous que ErrorPage est bien importé

import axios from 'axios';

// Mock axios pour que les appels GET renvoient une valeur simulée
jest.mock('axios');

beforeAll(() => {
  axios.get.mockResolvedValue({ data: { user: 'John Doe' } });
});

// Test pour vérifier que la page d'erreur s'affiche lorsque la route est inconnue
test('renders ErrorPage for unknown routes', () => {
  render(
    <MemoryRouter initialEntries={['/some/unknown/route']}>
      <App />
    </MemoryRouter>
  );

  // Vérifier que le texte ou un élément spécifique de la page d'erreur est présent
  expect(screen.getByText(/Error:/i)).toBeInTheDocument();  // Changez cette ligne en fonction du texte ou de l'élément qui existe dans votre ErrorPage
});