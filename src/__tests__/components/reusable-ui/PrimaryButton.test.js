import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from '../../../components/reusable-ui/PrimaryButton';
import { theme } from '../../../theme/index';
import 'jest-styled-components';

describe('PrimaryButton Component', () => {
  test('renders with correct label', () => {
    render(<PrimaryButton label="Click Me" />);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
  });

  test('renders with an icon if provided', () => {
    const MockIcon = () => <svg data-testid="icon">Icon</svg>;
    render(<PrimaryButton label="With Icon" Icon={<MockIcon />} />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<PrimaryButton label="Click" onClick={handleClick} />);
    const button = screen.getByText('Click');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct styles', () => {
    const { container } = render(<PrimaryButton label="Styled Button" />);
    expect(container.firstChild).toHaveStyleRule('background', theme.colors.primary2);
    expect(container.firstChild).toHaveStyleRule('color', 'white');
  });

  test('is disabled when the disabled property is set', () => {
    render(<PrimaryButton label="Disabled" disabled />);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  test('applies hover styles correctly', () => {
    const { container } = render(<PrimaryButton label="Hover Test" />);
    expect(container.firstChild).toHaveStyleRule('background', 'white', {
      modifier: ':hover:not(:disabled)',
    });
    expect(container.firstChild).toHaveStyleRule('color', theme.colors.primary2, {
      modifier: ':hover:not(:disabled)',
    });
  });
});