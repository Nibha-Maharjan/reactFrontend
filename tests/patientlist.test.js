import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PatientList from '../app/components/Pages/patientForm';
import { NavigationContainer } from '@react-navigation/native';

describe('PatientList Component', () => {
  test('renders PatientList component', () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <PatientList />
      </NavigationContainer>
    );

    const searchInput = getByPlaceholderText('Search by name');
    const headingText = getByText('Patient Table');

    expect(searchInput).toBeTruthy();
    expect(headingText).toBeTruthy();
  });
});
