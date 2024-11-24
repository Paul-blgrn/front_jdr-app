import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from '../../../../components/pages/error/ErrorPage'; // Assure-toi d'importer ton composant

// Test d'intégration pour vérifier que ErrorPage est rendu pour les routes non définies
describe('ErrorPage Component', () => {
  test('should render ErrorPage for unknown route', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    );

    // Vérifier que l'élément ErrorPage a bien été rendu
    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
  });
});