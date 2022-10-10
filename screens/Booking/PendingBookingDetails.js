import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Divider } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import moment from "moment";
import { REST_API_LOCAL } from "@env";

export default function PendingBookingDetails({ navigation, route }) {
  const [bookingData, setBookingData] = React.useState(route.params);

  const deleteData = async () => {
    let token = await SecureStore.getItemAsync("userToken")
    let response = await axios.delete(
      `${REST_API_LOCAL}/shipper/deleteBooking/${bookingData._id}`,
      {withCredentials:true, headers:{Authorization:`Bearer ${token}`}}
    );
    let data = await response.data;
    console.log(data);
  };

  return (
    <ScrollView style={{ backgroundColor: "#E0EFF6" }}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginLeft: 20,
            color: "#005761",
          }}
        >
          {bookingData.shipmentDetails.type == "FTL"
            ? "Full Truck Load"
            : "Less Than Truck Load"}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 20,
            color: "black",
          }}
        >
          {moment(bookingData.dateTime).utc().format("MMMM Do YYYY, h:mm:ss a")}
        </Text>
        <View
          style={{
            elevation: 8,
            backgroundColor: "white",
            margin: 15,
            padding: 25,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              <FontAwesome name="location-arrow" color="#005761" size={20} />{" "}
              Source
            </Text>
            <Text style={{ fontSize: 16 }}>
              <FontAwesome name="map-marker" color="#005761" size={20} />{" "}
              Destination
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.addressContainer}>
              {bookingData.pickupAddress.city},{" "}
              {bookingData.pickupAddress.building}{" "}
              {bookingData.pickupAddress.street}
            </Text>
            <Text style={styles.addressContainer}>
              {bookingData.dropoffAddress.city},{" "}
              {bookingData.dropoffAddress.building}{" "}
              {bookingData.dropoffAddress.street}{" "}
            </Text>
          </View>
          <Divider />
          <View style={{ marginVertical: 25 }}>
            <View style={styles.propertyContainerStyle}>
              <Text>Weight</Text>
              <Text style={styles.propertyStyle}>
                {bookingData.shipmentDetails.weight} kg
              </Text>
            </View>

            <View style={styles.propertyContainerStyle}>
              <Text>Insurance</Text>
              <Text style={styles.propertyStyle}>No</Text>
            </View>

            <View style={styles.propertyContainerStyle}>
              <Text>Quantity</Text>
              <Text style={styles.propertyStyle}>
                {bookingData.shipmentDetails.quantity} Pcs
              </Text>
            </View>

            <View style={styles.propertyContainerStyle}>
              <Text>Status</Text>
              <Text style={styles.propertyStyle}>{bookingData.status}</Text>
            </View>
          </View>
          <Divider />
          <View style={{ marginVertical: 20 }}>
            <View style={styles.propertyContainerStyle}>
              <Text>Sub Total</Text>
              <Text style={styles.propertyStyle}>
                {bookingData.payment.amount} Rs
              </Text>
            </View>
            <View style={styles.propertyContainerStyle}>
              <Text>Insured Amount</Text>
              <Text style={styles.propertyStyle}>N/A</Text>
            </View>
            <View style={styles.propertyContainerStyle}>
              <Text>Tax</Text>
              <Text style={styles.propertyStyle}>N/A</Text>
            </View>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>Total</Text>
            <Text style={styles.paymentStyle}>
              {bookingData.payment.amount} Rs
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Cancel Booking", "Are you sure?", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Confirm",
                onPress: () => {
                  deleteData();
                  navigation.goBack();
                },
              },
            ]);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cancel Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Payments", { payId: bookingData.payment._id });
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#E0EFF6", height: "100%", padding: 15 },
  addressContainer: { width: "35%", fontSize: 16, fontWeight: "bold" },
  propertyContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    alignItems: "center",
  },
  propertyStyle: { fontSize: 16, fontWeight: "bold" },
  paymentStyle: { fontSize: 22, fontWeight: "bold", color: "#005761" },
  button: {
    marginTop: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#068E94",
    width: 200,
    alignSelf: "center",
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
