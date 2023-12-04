import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const AddRecord = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [recordData, setRecordData] = useState({
    //init data fields
    dateTime: '',
    vitalSigns: {
      bloodPressure: '',
      respiratoryRate: '',
      bloodOxygenLevel: '',
      heartBeatRate: '',
    },
  });

  useEffect(() => {
    // Fetch list of patients
    axios
      .get('http://localhost:3000/patient')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSaveRecord = () => {
    // Send the recordData to your server
    axios
      .post(
        'http://localhost:3000/patient/' + selectedPatient + '/records',
        recordData
      )
      .then((response) => {
        // success
        console.log('Record added successfully:', response.data);
      })
      .catch((error) => {
        // error
        console.error('Error adding record:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Record</Text>
      <Picker
        selectedValue={selectedPatient}
        onValueChange={(itemValue, itemIndex) => setSelectedPatient(itemValue)}
      >
        <Picker.Item label="Select Patient" value="" />
        {patients.map((patient) => (
          <Picker.Item
            label={patient.name}
            value={patient._id}
            key={patient._id}
          />
        ))}
      </Picker>
      <TextInput
        placeholder="Date Time"
        value={recordData.dateTime}
        onChangeText={(text) =>
          setRecordData({ ...recordData, dateTime: text })
        }
      />
      <TextInput
        placeholder="Blood Pressure"
        value={recordData.vitalSigns.bloodPressure}
        onChangeText={(text) =>
          setRecordData({
            ...recordData,
            vitalSigns: { ...recordData.vitalSigns, bloodPressure: text },
          })
        }
      />
      <TextInput
        placeholder="Respiratory Rate"
        value={recordData.vitalSigns.respiratoryRate}
        onChangeText={(text) =>
          setRecordData({
            ...recordData,
            vitalSigns: { ...recordData.vitalSigns, respiratoryRate: text },
          })
        }
      />
      <TextInput
        placeholder="Blood Oxygen Level"
        value={recordData.vitalSigns.bloodOxygenLevel}
        onChangeText={(text) =>
          setRecordData({
            ...recordData,
            vitalSigns: { ...recordData.vitalSigns, bloodOxygenLevel: text },
          })
        }
      />
      <TextInput
        placeholder="Heart Beat Rate"
        value={recordData.vitalSigns.heartBeatRate}
        onChangeText={(text) =>
          setRecordData({
            ...recordData,
            vitalSigns: { ...recordData.vitalSigns, heartBeatRate: text },
          })
        }
      />
      <Button title="Save Record" onPress={handleSaveRecord} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default AddRecord;
