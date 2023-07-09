import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>home</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    color: 'black',
  },
});
