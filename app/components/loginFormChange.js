//LoginFormChange Welcome Doctor/Nurse Title
import { View, Text, StyleSheet, Animated } from 'react-native';
import React from 'react';

const LoginFormChange = ({
  leftHeader,
  rightHeader,
  subHeader,
  leftHeaderTranslateX = 97,
  rightHeaderTranslateY = -20,
  rightHeaderOpacity = 0,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.header,
            { transform: [{ translateX: leftHeaderTranslateX }] },
          ]}
        >
          {leftHeader}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.header,
            {
              opacity: rightHeaderOpacity,
              transform: [{ translateY: rightHeaderTranslateY }],
            },
          ]}
        >
          {rightHeader}
        </Animated.Text>
      </View>
      <Text style={styles.subheader}>{subHeader}</Text>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: { fontSize: 30, fontWeight: 'bold', color: '#ffbc00' },
  subheader: { fontSize: 20, color: '#ffbc00', textAlign: 'center' },
});

export default LoginFormChange;
