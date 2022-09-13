import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { REST_API, REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";

const REST_API_ENDPOINT =
  "http://192.168.0.17:4000/shipper" || REST_API + "/shipper";

export default function MyBookings({ route, navigation }) {
  const [bookingData, setBookingData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState();

  function getValueFor() {
    // let result =
    SecureStore.getItemAsync("userToken").then((val) => setToken(val));
    // if (result) {
    //   return result
    // } else {
    //   return "Token not in SecureStore"
    // }
  }

  const getBookingsData = async () => {
    let isSubscribed = true;
    let token1 = await SecureStore.getItemAsync("userToken");
    // .then(val=>setToken(val));
    console.log(token1);
    // var obj = {
    //     method: 'GET',
    //     withCredentials: true,
    //     credentials: 'include',
    //     headers: {
    //         'Authorization': `Bearer ${token1}`
    //     }
    //   }
    // const response = await fetch(`${REST_API_ENDPOINT}/getBookings`, obj)
    // .then(function(res) {
    //     return res.json();
    // })
    // .then(function(resJson) {
    //     console.log(resJson)
    //     return resJson;
    // })
    // let data = await response.json()
    const headers = { Authorization: `Bearer ${token1}` };
    const resp = await axios.get(`${REST_API_ENDPOINT}/getBookings`, {
      withCredentials: true,
      headers: headers,
    });
    const data = resp.data.bookings;
    isSubscribed ? setBookingData(data) : null;
    setLoading(false);

    return () => (isSubscribed = false);
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      // getValueFor();
      getBookingsData();
    });
  }, [navigation]);

  // React.useEffect(() => {

  //   getBookingsData();

  // }, [setBookingData]);

  return (
    <View style={styles.container}>
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomColor: "#AAAAAA",
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}
                >
                  <Text style={styles.timeStyle}>
                    {bookingData[index].dateTime.substr(0, 10)}{" "}
                    {bookingData[index].dateTime.substr(11, 11)}
                  </Text>
                  <Text style={styles.paymentStyle}>
                    {bookingData[index].payment.amount} PKR
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 10,
                  }}
                >
                  <View>
                    <Text style={styles.heading}>Source</Text>
                    <Text style={styles.cityNameStyle}>
                      {bookingData[index].pickupAddress.city}{" "}
                      {bookingData[index].pickupAddress.street}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.heading}>Destination</Text>
                    <Text style={styles.cityNameStyle}>
                      {bookingData[index].dropoffAddress.city}{" "}
                      {bookingData[index].dropoffAddress.street}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.statusStyle}>
                      {bookingData[index].status}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
  cityNameStyle: { color: "#005761", fontWeight: "bold" },
  statusStyle: {
    fontSize: 12,
    margin: 5,
    color: "white",
    fontWeight: "bold",
    padding: 5,
    elevation: 3,
    borderRadius: 3,
    backgroundColor: "#068E94",
  },
});
