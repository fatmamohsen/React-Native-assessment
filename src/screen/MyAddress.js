import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RNPickerSelect from 'react-native-picker-select';

export const MyAddressesScreen = () => {
  const [addressesList, setAddressesList] = useState([]);
  const [isAllowedLocation, setIsAllowedLocation] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState(null);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`,
        )
          .then(response => {
            response.json();
          })
          .then(data => {
            const formattedCountries = data.map(country => ({
              label: country.name.common,
              value: country.cca2,
            }));
            setAddressesList(formattedCountries);
          })
          .catch(error => console.log(error));
      },
      error => {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const formattedCountries = data.map(country => ({
          label: country.name.common,
          value: country.cca2,
        }));
        setAddressesList(formattedCountries);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>From Currency:</Text>
      <RNPickerSelect
        value={selectedAddresses}
        onValueChange={value => {
          setSelectedAddresses(value);
        }}
        items={addressesList}
        placeholder={{
          label: 'Where are you from...',
        }}
        style={{
          inputIOS: styles.picker,
          inputAndroid: styles.picker,
        }}
      />
      {selectedAddresses ? <Text>{selectedAddresses}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  picker: {
    height: 50,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderWidth: 1,
  },
});
