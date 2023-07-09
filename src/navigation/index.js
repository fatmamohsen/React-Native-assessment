import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MyPermission} from '../screen/PermissionScreen';
import {Charts} from '../screen/Charts';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation={false}>
        <Drawer.Screen
          name="My Permission"
          component={MyPermission}
          options={{drawerLabel: 'MyPermission'}}
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
