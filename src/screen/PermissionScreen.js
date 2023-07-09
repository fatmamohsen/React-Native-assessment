import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

export const MyPermission = () => {
  const showToast = ({text, type}) => {
    Toast.show({
      type: text,
      text2: type,
    });
  };
  const onRequestLocationPermissionClick = () => {
    Geolocation.requestAuthorization(
      () => {
        console.log('Geolocation permission');
      },
      error => {
        if (error.PERMISSION_DENIED === 1) {
          showToast(
            'error',
            'Please activate your location to accurately locate your position',
          );
        }
      },
    );
  };
  const allowNotifications = () => {
    Linking.openSettings();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please allow your location</Text>
      <Pressable style={styles.btn} onPress={onRequestLocationPermissionClick}>
        <Text style={styles.btnText}>Allow location</Text>
      </Pressable>
      <Text style={styles.text}>Please enable sending notificatons to you</Text>
      <Pressable style={styles.btn} onPress={allowNotifications}>
        <Text style={styles.btnText}>Allow notifications</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    marginBottom: 24,
  },
  btn: {
    marginHorizontal: 24,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'black',
    marginBottom: 30,
  },
  btnText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginVertical: 10,
  },
});
