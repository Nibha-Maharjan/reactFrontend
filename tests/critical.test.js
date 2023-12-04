import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios'; // Mock axios

import CriticalPatient from '../app/components/Pages/CriticalPatient';

// Mocking axios GET request
jest.mock('axios');

describe('CriticalPatient Component', () => {
  test('renders list of critical patients', async () => {
    const mockResponse = {
      data: [{ _id: '1', name: 'John Doe' }],
    };

    axios.get.mockResolvedValue(mockResponse);

    const { getByText } = render(
      <NavigationContainer>
        <CriticalPatient />
      </NavigationContainer>
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    mockResponse.data.forEach((patient) => {
      const patientNameElement = getByText(patient.name);
      expect(patientNameElement).toBeTruthy();
    });
  });
});
