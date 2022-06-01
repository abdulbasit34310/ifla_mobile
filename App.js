import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
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

import { CustomDrawer } from './screens/CustomDrawer';
import { AuthContext } from './components/context';

const Drawer = createDrawerNavigator();

export default function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
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
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
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
        const userToken = foundUser.userToken;
        const userName = foundUser.userName;

        try {
          await SecureStore.setItemAsync('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync('userToken')
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
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
            drawerContent={(props) => <CustomDrawer {...props} />}
          // screenOptions={{swipeEdgeWidth: 0}}
          >
            <Drawer.Screen name="MainScreen" component={MainScreen} options={{title: "Home" }} />
            <Drawer.Screen name="TrackingScreen" component={TrackingScreen} options={{title: "Tracking" }}/>
            <Drawer.Screen options={{ headerShown: false }} name="Booking" component={BookingStack} />
            <Drawer.Screen options={{ headerShown: false }} name="Profile" component={ProfileStack} />
          </Drawer.Navigator>
        ) : (
          <RegistrationNavigationScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

const Stack = createNativeStackNavigator();

function BookingStack({ route }) {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: '#005761',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
      headerStyle: { backgroundColor: 'white', padding: 0 }
    }}>
      <Stack.Screen name="BookingScreen" component={BookingScreen}  options={{title: "Booking" }}/>
      <Stack.Screen name="ScheduleBooking" component={ScheduleBooking} options={{title: "Schedule Booking" }}/>
      <Stack.Screen name="GetAQuote" component={GetAQuote} options={{title: "Get a Quote" }}/>
      <Stack.Screen name="ViewQuotes" component={ViewQuotes} options={{title: "View Quote" }}/>
      <Stack.Screen name="QuoteDetails" component={QuoteDetails} options={{title: "Quote Details" }}/>
      <Stack.Screen name="PendingBookings" component={PendingBookings} options={{title: "Pending Bookings" }} />
      <Stack.Screen name="PendingBookingDetails" component={PendingBookingDetails} options={{title: "Booking Details" }} />
      <Stack.Screen name="MyBookings" component={MyBookings} options={{title: "My Bookings" }} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} options={{title: "Booking Details" }} />
    </Stack.Navigator>
  );
}


function ProfileStack({ route }) {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: '#005761',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
      headerStyle: { backgroundColor: 'white', padding: 0 }
    }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{title: "Profile" }}/>
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{title: "Edit Profile" }}/>
      <Stack.Screen name="CompanyInformationScreen" component={CompanyInformationScreen} options={{title: "Company Info" }}/>
    </Stack.Navigator>
  );
}
