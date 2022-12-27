import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { LogBox, Image, Platform,Button, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
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
import IFLAlogo from "../assets/IFLAji.png";

const axios = require("axios");

// LogBox.ignoreLogs(['new NativeEventEmitter']);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
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
    let result = await SecureStore.getItemAsync("userToken")

    try {
      var response = await axios.post(
        `${REST_API_LOCAL}/notifications/token`,
        { token: { value: token } }, {
        headers: { Authorization: `Bearer ${result}` },
      }
      );
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
  const [shipperName, setShipperName] = React.useState("");
  const [user, setUser] = React.useState("");

  const getSignedInUserCredentials = async () => {

    let token = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${REST_API_LOCAL}/users/getUser`, {
      withCredentials: true,
      headers: headers,
    });

    const data = response.data;
    setShipperName(data.personId.name);
    setUser(data)
    // await AsyncStorage.setItem('user', JSON.stringify(data))
    // await SecureStore.setItemAsync("user", JSON.stringify(data));
    // console.log("user stored?")
  };

  React.useEffect(() => {
    getSignedInUserCredentials();  
  }, []);

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
        // console.log(response.notification.request.content);
        navigation.navigate("Notification")
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

  return (

    <View style={styles.container}>

      <StatusBar style="light" />

      <View style={styles.topSection}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
          <Text style={{ color: "#068E94", fontSize: 18, fontWeight: "bold" }}>
            Welcome
          </Text>
          <Text style={{ color: "#005761", fontSize: 26, fontWeight: "bold" }}>
          {shipperName}
          </Text>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate("Notification") }}>
            <MaterialCommunityIcons
              name="bell-outline"
              color={"#005761"}
              size={26}
            />
          </TouchableOpacity>
        </View>

        <Animatable.Image
          animation="lightSpeedIn"
          style={styles.IFLAlogo}
          source={IFLAlogo}
        />
      </View>

      <Animatable.View style={styles.bottomSection}
        animation="fadeInUp"
      >
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("FreightBooking", { screen: "BookingScreen", params: { user: user } });
            }}
          >
            <View>
              <Text>Booking</Text>
              <Image
                source={bookingIllustration}
                style={{
                  width: 85,
                  height: 65,
                  left: "50%",
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("QuoteStack", { screen: "GetAQuote", params:{ insurance: user.insurance } });
            }}
          >
            <Text>Get a Quote</Text>
            <Image
              source={trackingIllustration}
              style={{
                width: 82,
                height: 70,
                left: "47%",
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("Payments", { screen: "Wallet", params: { user: user } });
            }}
          >
            <Text>Payments and Wallet</Text>
            <Image
              source={walletIllustration}
              style={{
                width: 75,
                height: 77,
                left: "47%",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("ProfileStack", { screen: "ProfileScreen", params: { user: user } });
            }}
          >
            <Text>Profile</Text>
            <Image
              source={gaqIllustration}
              style={{
                width: 75,
                height: 77,
                left: "47%",
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
    backgroundColor: "#EEF5F5",
  },
  topSection: {
    flex: 2,
    backgroundColor: "#EEF5F5",
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#00ABB2",
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
  IFLAlogo: {
    alignSelf: "center",
    width: 250,
    height: 225,
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