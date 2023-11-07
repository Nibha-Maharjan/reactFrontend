import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppForm from './components/AppForm';
import ImageUpload from './components/imageUpload';
import UserProfile from './components/UserProfile';
import PatientForm from './components/patientForm';
import DrawerNavigator from './DrawerNavigator';
import { useLogin } from './context/LoginProvider';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm" />
      <Stack.Screen component={ImageUpload} name="ImageUploader" />
    </Stack.Navigator>
  );
};
export default function MainNavigator() {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
}
