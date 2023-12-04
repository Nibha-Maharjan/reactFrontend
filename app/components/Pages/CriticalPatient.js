import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CriticalPatient = () => {
  const [criticalPatients, setCriticalPatients] = useState([]);
  const navigation = useNavigation();
  //get data of criritcal patient
  useEffect(() => {
    axios
      .get('http://localhost:3000/patient/critical-patients')
      .then((response) => {
        setCriticalPatients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePatientPress = (patient) => {
    navigation.navigate('CriticalRecord', { patient });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={criticalPatients}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePatientPress(item)}
            style={styles.patientItem}
          >
            <Text style={styles.patientName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  patientItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 3,
  },
  patientName: {
    fontSize: 18,
  },
});

export default CriticalPatient;
