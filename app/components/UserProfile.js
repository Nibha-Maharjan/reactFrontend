import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const UserProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Patient</Text>
      <Text style={styles.text}>Name</Text>
      <TextInput placeholder="Patient Name" style={styles.input} />
      <Text style={styles.text}>Patient Age</Text>
      <TextInput placeholder="Age" style={styles.input} />
      <Text style={styles.text}>Patient Number</Text>
      <TextInput placeholder="Number" style={styles.input} />
      <Text style={styles.text}>Email</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <Text style={styles.text}>Address</Text>
      <TextInput placeholder="Address" style={styles.input} />
      <Button
        title="Add Patients"
        onPress={() => navigation.navigate('PatientForm')}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 35,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
    width: 150,
    marginBottom: 20,
  },
});

export default UserProfile;
