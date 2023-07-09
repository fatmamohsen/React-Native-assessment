import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, Text, View, FlatList} from 'react-native';

const Item = ({item}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.currency}</Text>
      <Text style={styles.itemText}>{item.rate}</Text>
    </View>
  );
};
export const CurrenciesScreen = () => {
  const [currencies, setCurrencies] = useState([]);
  const fetchCurrencies = () => {
    return axios
      .get('https://api.vatcomply.com/rates')
      .then(response => {
        const rates = response.data.rates;
        const ratesArray = Object.entries(rates).map(([currency, rate]) => ({
          currency,
          rate,
        }));
        setCurrencies(ratesArray);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCurrencies();
    const timeInterval = 10000;
    let intervalId = null;
    intervalId = setInterval(fetchCurrencies, timeInterval);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={currencies}
        renderItem={({item}) => <Item item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return <Text>no currencies</Text>;
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchCurrencies} />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    flexDirection: 'row',
    marginHorizontal: 24,
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 16,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
