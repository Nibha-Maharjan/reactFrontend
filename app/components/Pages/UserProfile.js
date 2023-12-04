import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const AddPatient = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    address: '',
  });
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleAddPatient = () => {
    axios
      .post('http://localhost:3000/patient/', formData)
      .then((response) => {
        console.log('Patient data saved successfully:', response.data);
        // success
        Alert.alert('Success', 'Patient data saved successfully');
      })
      .catch((error) => {
        console.error('Error saving patient data:', error);
        // error
        Alert.alert('Error', 'Failed to save patient data. Please try again.');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Patient</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('name', text)}
        value={formData.name}
      />
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('age', text)}
        value={formData.age.toString()}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('address', text)}
        value={formData.address}
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('phone', text)}
        value={formData.phone}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('email', text)}
        value={formData.email}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('description', text)}
        value={formData.description}
        multiline
      />
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('date', text)}
        value={formData.date}
      />
      <Button title="Add Patients" onPress={handleAddPatient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 90,
    paddingTop: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default AddPatient;
