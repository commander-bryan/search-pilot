import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import App from './App';

test('renders learn react link', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  expect(screen.getByText(/Manage products/i)).toBeInTheDocument();
  expect(screen.getByText(/Add new product/i)).toBeInTheDocument();
  expect(screen.getByText(/View all products/i)).toBeInTheDocument();

  // TODO: test links take user to appropriate page
});
