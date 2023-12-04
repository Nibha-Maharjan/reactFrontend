import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import axios from 'axios';
import AddPatient from '../app/components/Pages/UserProfile';

jest.mock('axios');

test('renders Add Patient button', () => {
  const { getByText } = render(<AddPatient />);
  const addButton = getByText('Add Patients');
  expect(addButton).toBeTruthy();
});
