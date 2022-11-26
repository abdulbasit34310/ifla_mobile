import * as React from "react";
import { View, Text, Image, } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

import LiveTracking from "../screens/Booking/LiveTracking";
import MyBookings from "../screens/Booking/MyBookings";
import BookingDetails from "../screens/Booking/BookingDetails";
import BookingsHistory from "../screens/Booking/BookingsHistory";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function TopTabNavigator({ navigation }) {
    return (
        <TopTab.Navigator
            initialRouteName="TransitBookingsStack"
            screenOptions={{
                tabBarActiveTintColor: '#00ABB2',
                tabBarLabelStyle: { fontSize: 14 },
                tabBarStyle: { backgroundColor: '#E0EFF6' },
            }}
        >
            <TopTab.Screen name="TransitBookingsStack" component={TransitBookingsStack} options={{ title: "In Transit" }} />
            <TopTab.Screen name="BookingsHistoryStack" component={BookingsHistoryStack} options={{ title: "History" }} />
        </TopTab.Navigator>
    );
}


function TransitBookingsStack({ navigation, route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyBookings" component={MyBookings} options={{ headerShown: false }} />
            <Stack.Screen name="BookingDetails" component={BookingDetails} options={{ headerShown: false }} />
            <Stack.Screen name="LiveTracking" component={LiveTracking} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};

function BookingsHistoryStack({ navigation, route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BookingsHistory" component={BookingsHistory} options={{ headerShown: false }} />
            <Stack.Screen name="BookingDetails" component={BookingDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};





export default TopTabNavigator;