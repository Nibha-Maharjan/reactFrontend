import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../app/components/Pages/Home';

describe('<Home />', () => {
  test('renders welcome message', () => {
    const { getByText } = render(<Home />);
    const welcomeMessage = getByText('Welcome to Centen Hospital App');
    expect(welcomeMessage).toBeTruthy();
  });
});
