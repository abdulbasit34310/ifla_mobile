import * as React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from 'expo-status-bar';

import RegistrationNavigator from "./navigation/RegistrationNavigator";
import TopTabNavigator from "./navigation/TopTabNavigator";

import MainScreen from "./screens/MainScreen";

import Insurance from "./screens/Insurance/Insurance";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import EditProfileScreen from "./screens/Profile/EditProfileScreen";
import CompanyInformationScreen from "./screens/Profile/CompanyInformationScreen";
import BookingScreen from "./screens/Booking/BookingScreen";

import LiveTracking from "./screens/Booking/LiveTracking";
import PendingBookings from "./screens/Booking/PendingBookings";
import ScheduleBooking from "./screens/Booking/ScheduleBooking";
import BookingDetails from "./screens/Booking/BookingDetails";
import BillofLading from "./components/BillofLading";

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

import Notification from "./screens/Notification";
import PaymentHistory from "./screens/Payment/PaymentHistory";
import PayReceipt from "./screens/Payment/PayReceipt";

import MessagesScreen from "./screens/MessagesScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    disablePrompt: false
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "FIRST_TIME_LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          disablePrompt: false
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
          disablePrompt: false
        };
      case "DISABLED_ACC_LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
          disablePrompt: true
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
          disablePrompt: false
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
          disablePrompt: false
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
      },
      disabledSignIn: async (foundUser) => {
        const userToken = foundUser.userToken;
        const email = foundUser.email;
  
        try {
          await SecureStore.setItemAsync("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "DISABLED_ACC_LOGIN", id: email, token: userToken });
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
      <StatusBar hidden={true} />
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}

            screenOptions={{
              headerShown: false,
            }}
          >
            <Drawer.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ title: "Home" }}
            />
            <Drawer.Screen
              name="FreightBooking"
              component={FreightBookingStack}
            />
            <Drawer.Screen name="QuoteStack" component={QuoteStack} />
            <Drawer.Screen name="ProfileStack" component={ProfileStack} />
            <Drawer.Screen name="Payments" component={PaymentsStack} />
            <Drawer.Screen name="Feedback" component={Feedback} />
            <Drawer.Screen name="Complaint" component={Complaint} />
            <Drawer.Screen name="Notification" component={NotificationStack} />
            <Drawer.Screen name="MessagesScreen" component={MessagesScreen} />
          </Drawer.Navigator>
        ) : (
          <RegistrationNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

function NotificationStack({ navigation, route }){
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
        name="NotificationScreen"
        component={Notification}
      />
      <Stack.Screen
        name="BookingDetails"
        component={BookingDetails}
      />
    </Stack.Navigator>
)
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

      />
      <Stack.Screen
        name="ScheduleBooking"
        component={ScheduleBooking}

      />

      <Stack.Screen
        name="ScheduleExample"
        component={ScheduleExample}

      />
      <Stack.Screen
        name="PendingBookings"
        component={PendingBookings}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name="BillofLading" component={BillofLading} />
      <Stack.Screen
        name="LiveTracking"
        component={LiveTracking}

      />
      <Stack.Screen
        name="TopTabNavigatorStack"
        component={TopTabNavigatorStack}
        options={{
          tabBarLabel: "Bookings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="truck-delivery"
              color={color}
              size={26}
            />
          ),
          tabBarColor: "#005761",
        }}
      />
      <Stack.Screen
        name="Payments"
        component={PaymentsStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function QuoteStack({ navigation, route }) {
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
        options={{ title: "Quote Details", headerShown: true }}
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
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile", headerShown: false }}
      />
      <Stack.Screen
        name="CompanyInformationScreen"
        component={CompanyInformationScreen}
        options={{ title: "Company Information" }}
      />
      <Stack.Screen
        name="Addresses"
        component={Addresses}
        options={{ headerShown: false }}
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
      <Stack.Screen
        name="Insurance"
        component={Insurance}
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoadMoneyToWallet"
        component={LoadMoneyToWallet}
        options={{ title: "Load Money", headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PayByWallet"
        component={PayByWallet}
        options={{ title: "Paid By Wallet", headerShown: false }}
      />
      <Stack.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{ title: "Payment History", headerShown: false }}
      />
      <Stack.Screen
        name="PaymentReceipt"
        component={PayReceipt}
        options={{ title: "Payment Receipt", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TopTabNavigatorStack({ navigation, route }) {
  return <TopTabNavigator />;
}

// Buttons and Primary Foreground: #068E94
// Secondary Foreground: #00ABB2
// Background Primary and Text: #005761
// Background Secondary: #E0EFF6
