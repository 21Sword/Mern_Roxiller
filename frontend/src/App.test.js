import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/MERN STACK E_COMMERSE WEBSITE/i);
  expect(linkElement).toBeInTheDocument();
});
