//Login form imports form style from forminput
import React, { Component, isValidElement, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmit from './FormSubBtn';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import client from '../api/client';
import { useLogin } from '../context/LoginProvider';

// create a component
const LoginForm = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { email, password } = userInfo;
  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Fields cannot be empty', setError);
    if (!isValidEmail(email)) return updateError('Invalid Email', setError);
    if (!password.trim() || password.length < 8)
      return updateError('Password wrong', setError);

    return true;
  };
  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const res = await client.post('/sign-in', { ...userInfo });
        if (res.data.success) {
          setUserInfo({ email: '', password: '' });
          setProfile(res.data.user);
          setIsLoggedIn(true);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={email}
        label="Email"
        onChangeText={(value) => handleOnChangeText(value, 'email')}
        placeholder="Enter your Email"
        autoCapitalize="none"
      />
      <FormInput
        secureTextEntry
        value={password}
        onChangeText={(value) => handleOnChangeText(value, 'password')}
        autoCapitalize="none"
        label="Password"
        placeholder="Enter your Password"
      />
      <FormSubmit title="Login" onPress={submitForm} />
    </FormContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  header: { fontSize: 16, fontWeight: 'bold' },
});

//make this component available to the app
export default LoginForm;
