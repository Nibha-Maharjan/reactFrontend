import React from 'react';
import { render } from '@testing-library/react-native';
import axios from 'axios';

import PatientRecord from '../app/components/Pages/PatientRecord';

jest.mock('axios');

describe('PatientRecord Component', () => {
  test('renders list of patients', async () => {
    const mockResponse = {
      data: [{ _id: '1', name: 'Person Person1' }],
    };

    axios.get.mockResolvedValue(mockResponse);

    const { getByText } = render(<PatientRecord />);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    mockResponse.data.forEach((patient) => {
      const patientNameElement = getByText(patient.name);
      expect(patientNameElement).toBeTruthy();
    });
  });
});
