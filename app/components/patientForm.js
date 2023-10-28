import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BagList(props) {
  const [bags, setbags] = useState([]);
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/RaniaArbash/myBagsRepo/main/mybags.json'
    )
      .then((response) => response.json()) // string -> json object
      .then((data) => setbags(data.bags)) // array of bags
      .catch((error) => console.log(error));
  }, []);
  renderItem = (data) => (
    <TouchableOpacity>
      <Text style={styles.text}>{data.item.size}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Patient Table</Text>
      <FlatList data={bags} renderItem={(item) => this.renderItem(item)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: { fontSize: 30, fontWeight: 'bold' },
  text: {
    fontSize: 20,
  },
});
