import { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function PatientList(props) {
  //Navigation to send data
  const navigation = useNavigation();
  //Set Patients
  const [patient, setPatients] = useState([]);
  //Fetch data from Backend
  const fetchPatients = () => {
    axios
      .get('http://localhost:3000/patient/')
      .then((response) => setPatients(response.data))
      .catch((error) => console.log(error));
  };
  //Update Page after adding newpatient
  useFocusEffect(
    useCallback(() => {
      fetchPatients();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientItem}
      onPress={() => navigation.navigate('PatientDetails', { patient: item })}
    >
      <Text style={styles.patientName}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Patient Table</Text>
      <FlatList
        data={patient}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  patientItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  patientName: {
    fontSize: 18,
    color: '#333333',
  },
  flatList: {
    flex: 1,
  },
});
