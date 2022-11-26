import * as React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

import RegistrationNavigator from "./navigation/RegistrationNavigator";
import TopTabNavigator from "./navigation/TopTabNavigator";

import MainScreen from "./screens/MainScreen";

import ProfileScreen from "./screens/Profile/ProfileScreen";
import EditProfileScreen from "./screens/Profile/EditProfileScreen";
import CompanyInformationScreen from "./screens/Profile/CompanyInformationScreen";
import BookingScreen from "./screens/Booking/BookingScreen";

import LiveTracking from "./screens/Booking/LiveTracking";
import PendingBookings from "./screens/Booking/PendingBookings";
import ScheduleBooking from "./screens/Booking/ScheduleBooking";
import BookingDetails from "./screens/Booking/BookingDetails";

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

import Feedback from "./screens/Feedback";
import Complaint from "./screens/Complaint";
import PaymentMethod from "./screens/Payment/PaymentMethod";
import PayByWallet from "./screens/Payment/PayByWallet";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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
      register: async (foundUser) => {
        const userToken = foundUser.userToken;
        const email = foundUser.email;

        try {
          await SecureStore.setItemAsync("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "REGISTER", id: email, token: userToken });
      }
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
            screenOptions={{
              headerShown: false
            }}
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
            <Drawer.Screen
              options={{ headerShown: false }}
              name="Feedback"
              component={Feedback}
            />
            <Drawer.Screen
              options={{ headerShown: false }}
              name="Complaint"
              component={Complaint}
            />
          </Drawer.Navigator>
        ) : (
          <RegistrationNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


function FreightBookingStack({ navigation, route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#005761",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 20 },
        headerStyle: { backgroundColor: "white", padding: 0 },
        headerShown: false,
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
        options={{ title: "Get a Quote", headerShown: true  }}
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
        name="BookingDetails"
        component={BookingDetails}
      />
      <Stack.Screen
        name="LiveTracking"
        component={LiveTracking}
        options={{ title: "LiveTracking" }}
      />
      <Stack.Screen name="TopTabNavigatorStack" component={TopTabNavigatorStack}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="truck-delivery" color={color} size={26} />
          ),
          tabBarColor: '#005761',
        }} />
      <Stack.Screen
        name="Payments"
        component={PaymentsStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack({ navigation, route }) {
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
      <Stack.Screen
        name="Payments"
        component={PaymentsStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function PaymentsStack({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wallet"
        component={Wallet}
      />
      <Stack.Screen
        name="LoadMoneyToWallet"
        component={LoadMoneyToWallet}
        options={{ title: "Load Money" }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ title: "Pay Now" }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{ title: "Payment Method" }}
      />
      <Stack.Screen
        name="PayByWallet"
        component={PayByWallet}
        options={{ title: "Paid By Wallet", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TopTabNavigatorStack({ navigation, route }) {
  return (
    <TopTabNavigator />
  )
}
// Buttons and Primary Foreground: #068E94
// Secondary Foreground: #00ABB2
// Background Primary and Text: #005761
// Background Secondary: #E0EFF6 173340