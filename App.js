import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar, useColorScheme} from 'react-native';
import {MyDrawer} from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MyDrawer />
    </SafeAreaProvider>
  );
};

export default App;
