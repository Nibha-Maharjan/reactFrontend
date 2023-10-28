//Form For signup import form from forminput
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmit from './FormSubBtn';
import ImageUploader from './imageUpload';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '../api/client';
import { StackActions } from '@react-navigation/native';

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, 'Invalid Name')
    .required('Full name is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password too weak')
    .required('Password is required'),
  confirmPassword: Yup.string().equals(
    [Yup.ref('password'), null],
    'Passwords does not match'
  ),
});

// create a component
const SignUpForm = ({ navigation }) => {
  const userInfo = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [error, setError] = useState('');

  const { fullname, email, password, confirmPassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('All Fields are required', setError);
    if (!fullname.trim() || fullname.length < 3)
      return updateError('Name too short', setError);
    if (!isValidEmail(email))
      return updateError('Enter a valid Email', setError);
    if (!password.trim() || password.length < 8)
      return updateError('Use a Stronger password', setError);
    if (password !== confirmPassword)
      return updateError('Passwords do not match', setError);
    return true;
  };

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikActions) => {
    const res = await client.post('/create-user', {
      ...values,
    });

    if (res.data.success) {
      const signInRes = await client.post('/sign-in', {
        email: values.email,
        password: values.password,
      });
      if (signInRes.data.success) {
        navigation.dispatch(
          StackActions.replace('ImageUploader', {
            token: signInRes.data.token,
          })
        );
      }
    }
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { fullname, email, password, confirmPassword } = values;
          return (
            <>
              <FormInput
                value={fullname}
                error={touched.fullname && errors.fullname}
                onChangeText={handleChange('fullname')}
                onBlur={handleBlur('fullname')}
                label="Full Name"
                placeholder="Enter your fullname"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                autoCapitalize="none"
                label="Email"
                placeholder="Enter your Email"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                autoCapitalize="none"
                label="Password"
                placeholder="Enter your Password"
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry
                autoCapitalize="none"
                label="Confirm Password"
                placeholder="Re-enter your Password"
              />
              <FormSubmit
                title="Sign Up"
                Submitting={isSubmitting}
                onPress={handleSubmit}
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  header: { fontSize: 45, color: 'gray', fontWeight: 'bold' },
});

//make this component available to the app
export default SignUpForm;
