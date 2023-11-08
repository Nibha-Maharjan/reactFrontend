import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const RecordDetail = ({ route }) => {
  const { records } = route.params.patient;

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
      <Text style={styles.header}>Patient Records</Text>
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
});

export default RecordDetail;
