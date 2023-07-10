import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MyPermission} from '../screen/PermissionScreen';
import {Charts} from '../screen/Charts';
import {NavigationContainer} from '@react-navigation/native';
import {CurrenciesScreen} from '../screen/Currencies';
import {MyAddressesScreen} from '../screen/MyAddress';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation={false}>
        <Drawer.Screen
          name="MyAddresses"
          component={MyAddressesScreen}
          options={{drawerLabel: 'MyAddresses'}}
        />
        <Drawer.Screen
          name="My Permission"
          component={MyPermission}
          options={{drawerLabel: 'MyPermission'}}
        />
        <Drawer.Screen
          name="Currencies"
          component={CurrenciesScreen}
          options={{drawerLabel: 'Currencies'}}
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
