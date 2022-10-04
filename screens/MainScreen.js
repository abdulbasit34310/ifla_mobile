import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { View, StyleSheet, Text, Image, Platform, TouchableOpacity, } from "react-native";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Feather } from 'react-native-vector-icons';
import { Card } from 'react-native-paper';
import * as SecureStore from "expo-secure-store";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { AuthContext } from "../components/context";

import bookingIllustration from "../assets/Booking.png";
import gaqIllustration from "../assets/gaq.png";
import walletIllustration from "../assets/Wallet.png";
import trackingIllustration from "../assets/Tracking.png";

import IFLAlogo from '../assets/IFLA.png';

const axios = require("axios");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    try {
      var response = await axios.post(
        "http://192.168.100.133:4000/notifications/token",
        { token: { value: token } }
      );
      console.log(response.data);
    } catch (error) {
      console.warn(error);
      console.log(error);
    }
    // this.setState({ expoPushToken: token });
  } else {
    alert("Must use physical device for Push Notifications");
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  var response = await axios.post(
    "http://192.168.100.133:3000/notifications/token",
    { token: { value: token } }
  );
  // this.setState({ expoPushToken: token });
};
//  else {
//   alert("Must use physical device for Push Notifications");
// }

if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
  });
}

const MainScreen = ({ route, navigation }) => {
  const [token, setToken] = React.useState();
  const { signOut } = React.useContext(AuthContext);
  const [pushToken, setPushToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  function getValueFor() {
    let result = SecureStore.getItemAsync("userToken").then((val) =>
      setToken(val)
    );
    // console.log(result)
    // if (result)
    // // {
    //     setToken(result)
  }
  const deleteToken = () => {
    SecureStore.deleteItemAsync("userToken");
    signOut();
  };

  const isTokenExpired = () => {
    if (token) {
      const expiry = JSON.parse(atob(token.split(".")[1])).exp;
      console.log(expiry);
      console.log(Math.floor(new Date().getTime() / 1000) >= expiry);
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    }
    return false;
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getValueFor();
      if (isTokenExpired()) deleteToken();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <Text style={{ color: '#E0EFF6', fontSize: 18, fontWeight: 'bold' }}>
            Welcome, Abdul Basit
          </Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bell-outline"
              color={'#E0EFF6'}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSection}>

        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate("FreightBooking") }}>
            <View>
              <Text>Booking</Text>
              <Image source={bookingIllustration} style={{
                width: 75,
                height: 75,
                left: 85
              }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate("GetAQuote") }}>
            <Text>Get a Quote</Text>
            <Image source={gaqIllustration} style={{
              width: 75,
              height: 75,
              left: 85
            }} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate("Payments") }}>
            <Text>Payments</Text>
            <Image source={walletIllustration} style={{
              width: 75,
              height: 75,
              left: 85
            }} />
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate("") }}>
            <Text>Tracking</Text>
            <Image source={trackingIllustration} style={{
              width: 75,
              height: 75,
              left: 85
            }} />
          </TouchableOpacity> */}
        </View>

      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#068E94',
  },
  topSection: {
    flex: 1,
    backgroundColor: '#068E94',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 20,
  },
  bottomSection: {
    flex: 4,
    backgroundColor: '#E0EFF6',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingVertical: 25,
    paddingHorizontal: 25,
    elevation: 6,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    elevation: 3,
    height: 100,
    width: "46%",
    margin: 5,
    padding: 10,
    borderRadius: 14,
    backgroundColor: 'white'
  },

});
