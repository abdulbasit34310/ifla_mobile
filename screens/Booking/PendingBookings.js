import * as React from "react";
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import axios from "axios";
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import { Divider, TouchableRipple } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import moment from "moment";

import NoBookingIllustration from "../../assets/NoBooking.png";

// import { REST_API_LOCAL } from "@env";
const REST_API_LOCAL = "http://192.168.100.143:4000";

export default function PendingBookings({ route, navigation }) {
  const [bookingData, setBookingData] = React.useState();

  const getBookingsData = async () => {
    let isSubscribed = true;
    let token1 = await SecureStore.getItemAsync("userToken");

    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios.get(
      `${REST_API_LOCAL}/shipper/getPendingBookings`,
      { withCredentials: true, headers: headers }
    );
    const data = await response.data.bookings;
    // console.log(data);

    let x = data.filter((a) => {
      if (a.status == 'Pending') {
        return a;
      }
    })

    isSubscribed ? setBookingData(x.reverse()) : null;
    return () => (isSubscribed = false);
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getBookingsData();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 15, paddingTop: 10 }}>
        <TouchableRipple style={{ width: '12%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
          navigation.popToTop();
        }}>
          <Entypo name='chevron-small-left' size={34} />
        </TouchableRipple>
      </View>
      <StatusBar style="dark" />

      <FlatList
        refreshing={false}
        onRefresh={getBookingsData}
        keyExtractor={(item, index) => index}
        data={bookingData}
        ListEmptyComponent={
          <View style={{
            justifyContent: 'center',
            alignSelf: "center",
            marginTop: '50%',
            alignContent: 'center',
          }}>
            <Animatable.Image
              animation="lightSpeedIn"
              style={styles.illustrationStyle}
              source={NoBookingIllustration}
            />
            <Text style={styles.timeStyle}>Schedule A Booking</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.flatListStyle}
            onPress={() => {
              navigation.push("BookingDetails", item);
            }}
          >
            <View>
              <View style={styles.action}><Text style={styles.dataAndTimeStyle}>ID: - {bookingData[index]._id}</Text></View>
              <Divider />

              <View style={[styles.action, { paddingTop: 5 }]}>
                <Text style={styles.timeStyle}>
                  {moment(bookingData[index].dateTime)
                    .utc()
                    .format("MMM Do YYYY, h:mm a")}
                </Text>
                <Text style={styles.paymentStyle}>
                  {bookingData[index].payment.amount} PKR
                </Text>
              </View>

              <View style={styles.action1}>
                <View>
                  <Text style={styles.heading}>Pickup Location</Text>
                  <Text style={styles.cityNameStyle}>
                    {bookingData[index].pickupAddress.city}{" "}
                    {bookingData[index].pickupAddress.street}
                  </Text>
                </View>
                <View>
                  <Text style={styles.heading}>Dropoff Location</Text>
                  <Text style={styles.cityNameStyle}>
                    {bookingData[index].dropoffAddress.city}{" "}
                    {bookingData[index].dropoffAddress.street}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#E0EFF6", height: "100%", padding: 15 },
  flatListStyle: {
    padding: 15,
    borderBottomColor: "#005761",
    backgroundColor: "white",
    margin: 5,
    borderRadius: 10,
    elevation: 8,
  },
  timeStyle: { fontWeight: "bold", fontSize: 17, color: "#005761" },
  paymentStyle: { fontSize: 15, fontWeight: "bold", color: "#00ABB2" },
  heading: { color: "#AAAAAA", fontSize: 12 },
  cityNameStyle: {
    color: "#005761",
    fontWeight: "bold",
  },
  illustrationStyle: {
    width: 200,
    height: 200,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#AAAAAA",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  action1: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    paddingTop: 10,
  }
});
