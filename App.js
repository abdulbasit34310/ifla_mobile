import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { registerRootComponent } from 'expo';
import RegistrationNavigationScreen from './screens/RegistrationNavigationScreen';
import MainScreen from './screens/MainScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RegistrationNavigationScreen />
    </NavigationContainer>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainScreen" component={MainScreen} />
    </Drawer.Navigator>
  );
}