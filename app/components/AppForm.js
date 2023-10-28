import {
  ScrollView,
  StyleSheet,
  Animated,
  View,
  Dimensions,
} from 'react-native';
import LoginFormChange from './loginFormChange';
import FormSelector from './formSelector';
import LoginForm from './loginForm';
import SignUpForm from './signUpForm';
import { useEffect, useRef } from 'react';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function AppForm({ navigation }) {
  const animation = useRef(new Animated.Value(0)).current;

  //Change Between Login and Signup Animated
  const scrollViewVar = useRef();

  const fetchApi = async () => {
    try {
      const res = await axios.get('http://10.0.0.22:3000/');
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  //Animation Values Input range to Output range
  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });
  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 97],
  });
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });
  const loginColorInt = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['#ffbc00', '#808080'],
  });
  const signupColorInt = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['#808080', '#ffbc00'],
  });

  return (
    <View style={{ flex: 1, paddingTop: 120 }}>
      <View style={{ height: 90 }}>
        <LoginFormChange
          leftHeader="Welcome "
          rightHeader="Doctor / Nurse"
          subHeader="Centen Hospital Application"
          rightHeaderOpacity={rightHeaderOpacity}
          leftHeaderTranslateX={leftHeaderTranslateX}
          rightHeaderTranslateY={rightHeaderTranslateY}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          marginBottom: 30,
        }}
      >
        <FormSelector
          backgroundColor={loginColorInt}
          title="Login"
          style={styles.borderLeft}
          onPress={() => scrollViewVar.current.scrollTo({ x: 0 })}
        />
        <FormSelector
          backgroundColor={signupColorInt}
          title="Sign Up"
          style={styles.borderRight}
          onPress={() => scrollViewVar.current.scrollTo({ x: width })}
        />
      </View>
      <ScrollView
        ref={scrollViewVar}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }],
          { useNativeDriver: false }
        )}
      >
        <LoginForm navigation={navigation} />
        <ScrollView>
          <SignUpForm navigation={navigation} />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  borderRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
