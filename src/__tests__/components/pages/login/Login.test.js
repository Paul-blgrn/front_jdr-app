import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../../../App'

test('should display the logged out menu when user is not logged in and login menu when logged in', async () => {
  render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
  )

  // Vérifier que le menu de connexion est affiché (composant LoggedOutMenu)
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign up/i)).toBeInTheDocument();

  // Simuler une action de connexion (changer l'état de l'utilisateur)
//   mockStore.dispatch({
//     type: 'LOGIN_USER_SUCCESS',
//     payload: { user: { id: 1, name: 'John', email: 'test@test.fr' } },
//   });

  // Attendre que l'interface soit mise à jour après la connexion
  await waitFor(() => {
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();  // Vérifier que le menu principal est visible (MainMenu)
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();   // Vérifier que le profil est affiché (Profile)
  });

  // Vérifier que le menu de déconnexion et le profil sont affichés pour un utilisateur connecté
  expect(screen.queryByText(/Login/i)).not.toBeInTheDocument(); // Le login ne doit plus être visible
  expect(screen.queryByText(/Sign up/i)).not.toBeInTheDocument(); // L'inscription ne doit plus être visible
});