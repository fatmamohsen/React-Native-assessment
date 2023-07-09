import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

export const Charts = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={{
            dataSets: [
              {
                values: [
                  {x: 5, y: 90},
                  {x: 10, y: 130},
                  {x: 50, y: 2000, marker: 'eat more'},
                  {x: 80, y: 9000, marker: 'eat less'},
                ],
              },
            ],
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
