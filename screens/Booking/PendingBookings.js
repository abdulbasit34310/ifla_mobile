import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
// import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
const REST_API_LOCAL = "http://192.168.0.111:4000";

export default function PendingBookings({ route, navigation }) {
  const [bookingData, setBookingData] = React.useState();
  //const [token,setToken] = React.useState(route.params.token)

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return "Token not in SecureStore";
    }
  }
  const getBookingsData = async () => {
    let isSubscribed = true;
    let token1 = await SecureStore.getItemAsync("userToken");
    // .then(val=>setToken(val));
    // console.log(token1)
    // var obj = {
    //     method: 'GET',
    //     withCredentials: true,
    //     credentials: 'include',
    //     headers: {
    //         'Authorization': `Bearer ${token1}`
    //     }
    //   }
    // const response = await fetch(`${REST_API_LOCAL}/shipper/getPendingBookings`, obj)
    // let data = await response.json()
    // const token = getValueFor('userToken')
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios.get(
      `${REST_API_LOCAL}/shipper/getPendingBookings`,
      { withCredentials: true, headers: headers }
    );
    const data = await response.data.bookings;
    console.log(data);
    isSubscribed ? setBookingData(data) : null;
    // setLoading(false);

    return () => (isSubscribed = false);
  };

  // React.useEffect(() => {
  //   getBookingsData();
  // }, [setBookingData]);

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getBookingsData();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
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
              navigation.push("PendingBookingDetails", item);
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
                  {moment(bookingData[index].dateTime)
                    .utc()
                    .format("MMM Do YYYY, h:mm:ss a")}
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
    width: "50%",
  },
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
