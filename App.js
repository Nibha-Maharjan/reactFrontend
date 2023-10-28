import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppForm from './app/components/AppForm';
import ImageUpload from './app/components/imageUpload';
import UserProfile from './app/components/UserProfile';
import PatientForm from './app/components/patientForm';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm" />
      <Stack.Screen component={ImageUpload} name="ImageUploader" />
      <Stack.Screen component={UserProfile} name="UserProfile" />
      <Stack.Screen component={PatientForm} name="PatientForm" />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
