import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Buttons and Primary Foreground: #068E94
// Secondary Foreground: #00ABB2
// Background Primary and Text: #005761
// Background Secondary: #E0EFF6

import RegistrationNavigationScreen from './screens/RegistrationNavigationScreen';
import MainScreen from './screens/MainScreen';
import TrackingScreen from './screens/TrackingScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import CompanyInformationScreen from './screens/CompanyInformationScreen';
import BookingScreen from './screens/BookingScreen';

import PendingBookings from './screens/PendingBookings';
import PendingBookingDetails from './screens/PendingBookingDetails';
import MyBookings from './screens/MyBookings';
import ScheduleBooking from './screens/ScheduleBooking';
import BookingDetails from './screens/BookingDetails';
import GetAQuote from './screens/GetAQuote';
import ViewQuotes from './screens/ViewQuotes';
import QuoteDetails from './screens/QuoteDetails';


// import Payment from './screens/Payment';
import { AuthContext } from './components/context';
import { CustomDrawer } from './screens/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function App() {

  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'FIRST_TIME_LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = String(foundUser[0].userToken);
        const email = foundUser[0].email;

        try {
          await AsyncStorage.setItem('userToken', email);
        } catch (e) {
          console.log(e);
        }

        dispatch({ type: 'LOGIN', id: email, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => { },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'FIRST_TIME_LOGIN', token: userToken });
    }, 2000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (





    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen  name="MainScreen" component={MainScreen} />
            <Drawer.Screen name="TrackingScreen" component={TrackingScreen} />
            <Drawer.Screen options={{headerShown: false}} name="Booking" component={BookingStack} />
            <Drawer.Screen options={{headerShown: false}} name="Profile" component={ProfileStack} />
 
          </Drawer.Navigator>
        ) : (
          
          <RegistrationNavigationScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const Stack = createNativeStackNavigator();


function BookingStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: '#005761',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
      headerStyle: { backgroundColor: 'white', padding: 0 }}}>
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="ScheduleBooking" component={ScheduleBooking} />
      <Stack.Screen name="GetAQuote" component={GetAQuote} />
      <Stack.Screen name="ViewQuotes" component={ViewQuotes} />
      <Stack.Screen name="QuoteDetails" component={QuoteDetails} />
      <Stack.Screen name="PendingBookings" component={PendingBookings} />
      <Stack.Screen
        name="PendingBookingDetails"
        component={PendingBookingDetails}
      />
      <Stack.Screen name="MyBookings" component={MyBookings} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
    </Stack.Navigator>
  );
}


function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: '#005761',
      headerTitleAlign: 'center',
      headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
      headerStyle: { backgroundColor: 'white', padding: 0 }}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="CompanyInformationScreen" component={CompanyInformationScreen} />
    </Stack.Navigator>
  );
}