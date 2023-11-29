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

  const isCritical = (label, value) => {
    switch (label) {
      case 'Blood Pressure':
        return value.includes('/') || value === 'High';
      case 'Respiratory Rate':
        return value < 12 || value > 25;
      case 'Blood Oxygen Level':
        return value < 90;
      case 'Heart Beat Rate':
        return value < 60 || value > 100;
      default:
        return false;
    }
  };

  const renderItemText = (label, value) => (
    <Text
      style={[styles.text, isCritical(label, value) && styles.criticalText]}
    >
      {label}: {value}
    </Text>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      {renderItemText('Date', item.dateTime)}
      {renderItemText('Blood Pressure', item.vitalSigns.bloodPressure)}
      {renderItemText('Respiratory Rate', item.vitalSigns.respiratoryRate)}
      {renderItemText('Blood Oxygen Level', item.vitalSigns.bloodOxygenLevel)}
      {renderItemText('Heart Beat Rate', item.vitalSigns.heartBeatRate)}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Critical Patient Records</Text>
      <FlatList
        data={records}
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
  criticalText: {
    color: 'red',
  },
});

export default CriticalRecord;
