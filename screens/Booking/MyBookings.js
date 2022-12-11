import * as React from "react";
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import axios from "axios";
import { Divider, TouchableRipple } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
import { StatusBar } from 'expo-status-bar';
import { REST_API_LOCAL } from "@env";

export default function MyBookings({ route, navigation }) {
  const [bookingData, setBookingData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState();

  const getBookingsData = async () => {
    let isSubscribed = true;
    let token1 = await SecureStore.getItemAsync("userToken");
    
    const headers = { Authorization: `Bearer ${token1}` };
    const resp = await axios.get(`${REST_API_LOCAL}/shipper/getBookings`, {
      withCredentials: true,
      headers: headers,
    });
    const data = resp.data.bookings;
    // console.log(data);
    let x = data.filter((a) => {
      if (a.status == 'Assigned' || a.status == "In Transit") {
        return a;
      }
    })
    isSubscribed ? setBookingData(x.reverse()) : null;
    setLoading(false);

    return () => (isSubscribed = false);
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getBookingsData();
    });
  }, [navigation]);


  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={{ paddingBottom: 15 }}>
        <TouchableRipple style={{ width: '12%', borderRadius: 14, padding: 7, backgroundColor: 'white', }} onPress={() => { navigation.goBack() }}>
          <Entypo name='chevron-small-left' size={34} />
        </TouchableRipple>
      </View>

      {loading && <ActivityIndicator />}
      {bookingData && (
        <FlatList
          refreshing={false}
          onRefresh={getBookingsData}
          keyExtractor={(item, index) => index}
          data={bookingData}
          ListEmptyComponent={
            <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 30 }}>
              No Bookings Found
            </Text>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.flatListStyle}
              onPress={() => {
                navigation.push("BookingDetails", item);
              }}
            >
              <View>

                <View style={styles.action}><Text style={styles.dataAndTimeStyle}>ID: {bookingData[index]._id}</Text></View>
                <Divider />

                <View style={[styles.action, {paddingTop: 5}]}>
                  <Text style={styles.dataAndTimeStyle}>
                    {moment(bookingData[index].dateTime)
                      .utc()
                      .format("MMM Do YYYY, h:mm a")}
                  </Text>
                  <Text style={styles.paymentStyle}>
                    {bookingData[index].payment.amount} PKR
                  </Text>
                </View>

                <Divider />

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
          )
          }
        />
      )}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0EFF6",
    height: "100%",
    padding: 15
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  flatListStyle: {
    padding: 15,
    borderBottomColor: "#005761",
    backgroundColor: "white",
    margin: 5,
    borderRadius: 14,
    elevation: 5,
  },
  dataAndTimeStyle: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#005761"
  },
  paymentStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00ABB2"
  },
  heading: {
    color: "#AAAAAA",
    fontSize: 12
  },
  addressStyle: {
    color: "black",
    fontWeight: "bold",
    width: "50%",
    fontSize: 15,
  },
  statusStyle: {
    fontSize: 12,
    margin: 5,
    color: "white",
    fontWeight: "bold",
    padding: 5,
    elevation: 5,
    borderRadius: 14,
    backgroundColor: "#068E94",
  },
  cityNameStyle: {
    color: "#005761",
    fontWeight: "bold",
  },
  action1: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    paddingTop: 10,
  }
});
