import { render, screen } from '@testing-library/react';
import App from './App';

test('renders greengafl landing page actions', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /dinner ideas that fit your evening/i })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /register/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('button', { name: /log in/i }).length).toBeGreaterThan(0);
  expect(screen.getByText(/create a user to try out personalized dinner suggestions/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /why use greengafl/i })).toBeInTheDocument();
});
