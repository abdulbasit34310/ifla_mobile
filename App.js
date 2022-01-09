import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RegistrationNavigationScreen from './screens/RegistrationNavigationScreen';
import MainScreen from './screens/MainScreen';
import { AuthContext } from './components/context';

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);


  const authContext = React.useMemo(
    () => ({
      signIn: () => {
        setUserToken('abcd');
        setIsLoading(false);
      },
      signOut: () => {
        setUserToken(null);
        setIsLoading(false);
      },
      signUp: () => {
        setUserToken('abcd');
        setIsLoading(false);
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken !== null ? <MyDrawer /> : <RegistrationNavigationScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainScreen" component={MainScreen} />
    </Drawer.Navigator>
  );
}
