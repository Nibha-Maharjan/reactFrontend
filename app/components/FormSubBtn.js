//Submit Touchable Opacity
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const FormSubmit = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting ? '#FFFFED' : 'gray';
  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.touch, { backgroundColor }]}
    >
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    color: '#fff',
  },
});

//make this component available to the app
export default FormSubmit;
