//Form Selector Login/Signup Title
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

// create a component
const FormSelector = ({ title, backgroundColor, style, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.login, { backgroundColor }, style]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  login: {
    height: 45,
    width: '50%',
    backgroundColor: '#ffbc00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 18 },
});

//make this component available to the app
export default FormSelector;
