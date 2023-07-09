import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from '../screen/Home';
import {Charts} from '../screen/Charts';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation={false}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{drawerLabel: 'Home'}}
        />
        <Drawer.Screen
          name="Charts"
          component={Charts}
          options={{drawerLabel: 'Charts'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
