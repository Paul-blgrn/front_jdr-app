import { render, screen } from '@testing-library/react';

// Composant de test très simple
const SimpleComponent = () => {
  return <div>Hello, Jest!</div>;
};

// Test
test('renders "Hello, Jest!" text', () => {
  render(<SimpleComponent />);
  // Vérifie que le texte "Hello, Jest!" est présent dans le DOM
  expect(screen.getByText(/Hello, Jest!/i)).toBeInTheDocument();
});