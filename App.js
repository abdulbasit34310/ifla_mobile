import * as React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

import RegistrationNavigator from "./screens/RegistrationNavigator";
import MainScreen from "./screens/MainScreen";

import ProfileScreen from "./screens/Profile/ProfileScreen";
import EditProfileScreen from "./screens/Profile/EditProfileScreen";
import CompanyInformationScreen from "./screens/Profile/CompanyInformationScreen";
import BookingScreen from "./screens/Booking/BookingScreen";

import LiveTracking from "./screens/Booking/LiveTracking";
import PendingBookings from "./screens/Booking/PendingBookings";
import PendingBookingDetails from "./screens/Booking/PendingBookingDetails";
import MyBookings from "./screens/Booking/MyBookings";
import ScheduleBooking from "./screens/Booking/ScheduleBooking";
import MyBookingDetails from "./screens/Booking/MyBookingDetails";

import GetAQuote from "./screens/Quote/GetAQuote";
import ViewQuotes from "./screens/Quote/ViewQuotes";
import QuoteDetails from "./screens/Quote/QuoteDetails";

import Wallet from "./screens/Payment/Wallet";
import LoadMoneyToWallet from "./screens/Payment/LoadMoneyToWallet";
import Payment from "./screens/Payment/Payment";

import { CustomDrawer } from "./screens/CustomDrawer";
import { AuthContext } from "./components/context";
import ScheduleExample from "./screens/Booking/ScheduleExample";

import Addresses from "./screens/Profile/Addresses";
import AddAddress from "./components/Profile/AddAddress";
import ChangePassword from "./screens/Profile/ChangePassword";

const Drawer = createDrawerNavigator();

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "FIRST_TIME_LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
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
        const email = foundUser.email;

        try {
          await SecureStore.setItemAsync("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGIN", id: email, token: userToken });
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: "FIRST_TIME_LOGIN", token: userToken });
    }, 2000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
            <Drawer.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ title: "Home" }}
            />
            <Drawer.Screen
              options={{ headerShown: false }}
              name="FreightBooking"
              component={FreightBookingStack}
            />
            <Drawer.Screen
              options={{ headerShown: false }}
              name="Profile"
              component={ProfileStack}
            />
            <Drawer.Screen
              options={{ headerShown: false }}
              name="Payments"
              component={PaymentsStack}
            />
          </Drawer.Navigator>
        ) : (
          <RegistrationNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const Stack = createNativeStackNavigator();

function FreightBookingStack({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#005761",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
        headerStyle: { backgroundColor: "white", padding: 0 },
      }}
    >
      <Stack.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{ title: "Booking" }}
      />
      <Stack.Screen
        name="ScheduleBooking"
        component={ScheduleBooking}
        options={{ title: "Schedule Booking" }}
      />

      <Stack.Screen
        name="ScheduleExample"
        component={ScheduleExample}
        options={{ title: "Schedule Example" }}
      />
      <Stack.Screen
        name="GetAQuote"
        component={GetAQuote}
        options={{ title: "Get a Quote" }}
      />
      <Stack.Screen
        name="ViewQuotes"
        component={ViewQuotes}
        options={{ title: "View Quote" }}
      />
      <Stack.Screen
        name="QuoteDetails"
        component={QuoteDetails}
        options={{ title: "Quote Details" }}
      />
      <Stack.Screen
        name="PendingBookings"
        component={PendingBookings}
        options={{ title: "Pending Bookings" }}
      />
      <Stack.Screen
        name="PendingBookingDetails"
        component={PendingBookingDetails}
        options={{ title: "Booking Details" }}
      />
      <Stack.Screen
        name="MyBookings"
        component={MyBookings}
        options={{ title: "My Bookings" }}
      />
      <Stack.Screen
        name="MyBookingDetails"
        component={MyBookingDetails}
        options={{ title: "Booking Details" }}
      />
      {/* <Stack.Screen
        name="Payments"
        component={Payment}
        options={{ title: "Pay Now" }}
      /> */}
      <Stack.Screen
        name="LiveTracking"
        component={LiveTracking}
        options={{ title: "LiveTracking" }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#005761",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
        headerStyle: { backgroundColor: "white", padding: 0 },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="CompanyInformationScreen"
        component={CompanyInformationScreen}
        options={{ title: "Company Info" }}
      />
      <Stack.Screen
        name="Addresses"
        component={Addresses}
        options={{ title: "Addresses" }}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{ title: "Add Address" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: "Change Password" }}
      />
    </Stack.Navigator>
  );
}

function PaymentsStack({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#005761",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
        headerStyle: { backgroundColor: "white", padding: 0 },
      }}
    >
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ title: "Wallet" }}
      />
      <Stack.Screen
        name="LoadMoneyToWallet"
        component={LoadMoneyToWallet}
        options={{ title: "LoadMoneyToWallet" }}
      />
       <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ title: "Pay Now" }}
      />
    </Stack.Navigator>
  );
}

// Buttons and Primary Foreground: #068E94
// Secondary Foreground: #00ABB2
// Background Primary and Text: #005761
// Background Secondary: #E0EFF6