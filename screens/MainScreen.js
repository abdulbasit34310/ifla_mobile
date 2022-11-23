import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Modal, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { Card } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from "../components/context";

import bookingIllustration from "../assets/Booking.png";
import gaqIllustration from "../assets/gaq.png";
import walletIllustration from "../assets/Wallet.png";
import trackingIllustration from "../assets/Tracking.png";
import { REST_API_LOCAL } from "@env";
import IFLAlogo from "../assets/IFLA.png";

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
    let result = await SecureStore.getItemAsync("userToken")
    console.log(result)

    try {
      var response = await axios.post(
        `${REST_API_LOCAL}/notifications/token`,
        { token: { value: token } }, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${result}` },
      }
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
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
}

const MainScreen = ({ route, navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  const [pushToken, setPushToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [token, setToken] = React.useState();
  const [shipperData, setShipperData] = React.useState("");

  const getSignedInUserCredentials = async () => {
    let token = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${REST_API_LOCAL}/users/getUser`, {
      withCredentials: true,
      headers: headers,
    });

    const data = await response.data;
    setShipperData(data.personId);
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getSignedInUserCredentials();
    });
  }, [navigation]);

  useEffect(() => {
    getValueFor()
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
  }
  const deleteToken = () => {
    SecureStore.deleteItemAsync("userToken");
    signOut();
  };

  return (

    <View style={styles.container}>

      <StatusBar style="light" />

      <View style={styles.topSection}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#E0EFF6", fontSize: 18, fontWeight: "bold" }}>
            Welcome, {shipperData.name}
          </Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bell-outline"
              color={"#E0EFF6"}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Animatable.View style={styles.bottomSection}
        animation="fadeInUp"
      >
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("FreightBooking", shipperData);
            }}
          >
            <View>
              <Text>Booking</Text>
              <Image
                source={bookingIllustration}
                style={{
                  width: 85,
                  height: 65,
                  left: 80,
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("FreightBooking", { screen: "GetAQuote" });
            }}
          >
            <Text>Get a Quote</Text>
            <Image
              source={trackingIllustration}
              style={{
                width: 82,
                height: 82,
                left: 70,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("Payments");
            }}
          >
            <Text>Payments and Wallet</Text>
            <Image
              source={walletIllustration}
              style={{
                width: 75,
                height: 77,
                left: 75,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Text>Profile</Text>
            <Image
              source={gaqIllustration}
              style={{
                width: 75,
                height: 77,
                left: 75,
              }}
            />
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#068E94",
  },
  topSection: {
    flex: 2,
    backgroundColor: "#068E94",
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#E0EFF6",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingVertical: 25,
    paddingHorizontal: 25,
    elevation: 6,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    elevation: 5,
    height: 100,
    width: "46%",
    margin: 5,
    padding: 10,
    borderRadius: 14,
    backgroundColor: "white",
  },
});
