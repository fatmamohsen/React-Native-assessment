import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {LineChart, Grid} from 'react-native-svg-charts';
import axios from 'axios';
const API_KEY = '0bbdd6fc55-a9ae53a12a-rxjd4t';
const mokeData = [50, 90, 30, 100, 70, 10];

export const Charts = () => {
  const [chartData, setChartData] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [timeInterval, setTimeInterval] = useState('1D');

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangeratesapi.io/history?start_at=${getStartDate()}&end_at=${getEndDate()}&base=${fromCurrency}&symbols=${toCurrency}&access_key=${API_KEY}`,
      );
      const data = response.data;
      console.log(data);
      if (data && data.rates) {
        const formattedData = formatChartData(data);
        setChartData(formattedData);
      } else {
        setChartData(mokeData);
        console.error('Error retrieving exchange rate data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStartDate = () => {
    const now = new Date();
    const startDate = new Date();
    switch (timeInterval) {
      case '1D':
        startDate.setDate(now.getDate() - 1);
        break;
      case '1M':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3M':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '1Y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case '5Y':
        startDate.setFullYear(now.getFullYear() - 5);
        break;
    }
    return formatDate(startDate);
  };

  const getEndDate = () => formatDate(new Date());

  const formatDate = date => date.toISOString().slice(0, 10);

  const formatChartData = data => {
    const labels = Object.keys(data.rates);
    const rates = labels.map(label => data.rates[label][toCurrency]);
    return rates;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>From Currency:</Text>
      <RNPickerSelect
        value={fromCurrency}
        onValueChange={value => setFromCurrency(value)}
        items={[
          {label: 'US Dollar', value: 'USD'},
          {label: 'Euro', value: 'EUR'},
          {label: 'British Pound', value: 'GBP'},
          {label: 'Japanese Yen', value: 'JPY'},
          {label: 'Canadian Dollar', value: 'CAD'},
        ]}
        placeholder={{
          label: 'Select a currency...',
          value: null,
        }}
        style={{
          inputIOS: styles.picker,
          inputAndroid: styles.picker,
        }}
      />
      <Text style={styles.label}>To Currency:</Text>
      <RNPickerSelect
        value={toCurrency}
        onValueChange={value => setToCurrency(value)}
        items={[
          {label: 'Euro', value: 'EUR'},
          {label: 'US Dollar', value: 'USD'},
          {label: 'British Pound', value: 'GBP'},
          {label: 'Japanese Yen', value: 'JPY'},
          {label: 'Canadian Dollar', value: 'CAD'},
        ]}
        placeholder={{
          label: 'Select a currency...',
          value: null,
        }}
        style={{
          inputIOS: styles.picker,
          inputAndroid: styles.picker,
        }}
      />
      <Text style={styles.label}>Time Interval:</Text>
      <RNPickerSelect
        value={timeInterval}
        onValueChange={value => setTimeInterval(value)}
        items={[
          {label: '1 Day', value: '1D'},
          {label: '1 Month', value: '1M'},
          {label: '3 Months', value: '3M'},
          {label: '1 Year', value: '1Y'},
          {label: '5 Years', value: '5Y'},
        ]}
        placeholder={{
          label: 'Select a time interval...',
          value: null,
        }}
        style={{
          inputIOS: styles.picker,
          inputAndroid: styles.picker,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={fetchChartData}>
        <Text style={styles.buttonText}>FetchData</Text>
      </TouchableOpacity>
      {chartData ? (
        <LineChart
          style={{height: 200, width: 300}}
          data={chartData}
          svg={{stroke: 'rgb(134, 65, 244)'}}
          contentInset={{top: 20, bottom: 20}}>
          <Grid />
        </LineChart>
      ) : (
        <Text style={styles.loadingText}>Loading chart data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
