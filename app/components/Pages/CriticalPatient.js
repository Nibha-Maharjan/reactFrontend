import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CriticalPatient = () => {
  const [criticalPatients, setCriticalPatients] = useState([]);
  const navigation = useNavigation();

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
    <View>
      <FlatList
        data={criticalPatients}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePatientPress(item)}>
            <Text>{item.name}</Text>
            {/* ... (display other patient data properties) */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CriticalPatient;
