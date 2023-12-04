// Name: Nibha Maharjan
// Student ID: 301282952
// Name: Saurav Gautam
// Student ID: 301286980
// Date Completed: Dec 3rd 2023

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './app/MainNavigator';
import LoginProvider from './app/context/LoginProvider';

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}
