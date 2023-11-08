import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CriticalRecord = ({ route }) => {
  const { records } = route.params.patient;

  const criticalRecords = records.filter((record) => {
    const { vitalSigns } = record;
    return (
      vitalSigns.bloodPressure &&
      (vitalSigns.bloodPressure.includes('/') ||
        vitalSigns.bloodPressure === 'High') &&
      vitalSigns.respiratoryRate &&
      (vitalSigns.respiratoryRate < 12 || vitalSigns.respiratoryRate > 25) &&
      vitalSigns.bloodOxygenLevel &&
      vitalSigns.bloodOxygenLevel < 90 &&
      vitalSigns.heartBeatRate &&
      (vitalSigns.heartBeatRate < 60 || vitalSigns.heartBeatRate > 100)
    );
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.text}>Date: {item.dateTime}</Text>
      <Text style={styles.text}>
        Blood Pressure: {item.vitalSigns.bloodPressure}
      </Text>
      <Text style={styles.text}>
        Respiratory Rate: {item.vitalSigns.respiratoryRate}
      </Text>
      <Text style={styles.text}>
        Blood Oxygen Level: {item.vitalSigns.bloodOxygenLevel}
      </Text>
      <Text style={styles.text}>
        Heart Beat Rate: {item.vitalSigns.heartBeatRate}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Critical Patient Records</Text>
      <FlatList
        data={criticalRecords}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});

export default CriticalRecord;
