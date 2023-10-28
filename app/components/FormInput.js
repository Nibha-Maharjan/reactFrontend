//form component for login and signup
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

// create a component
const FormInput = (props) => {
  const { label, placeholder, error } = props;
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Text style={styles.header}>{label}</Text>
        {error ? (
          <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
        ) : null}
      </View>

      <TextInput {...props} placeholder={placeholder} style={styles.input} />
    </View>
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
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 35,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

//make this component available to the app
export default FormInput;
