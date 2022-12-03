import * as React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image, ScrollView, FlatList, Alert, } from "react-native";
import { Card, Divider } from "react-native-paper";
import moment from "moment";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

import { REST_API_LOCAL } from "@env";

export default function MyBookingDetails({ navigation, route }) {
  const item = route.params;
  const [bookingData, setBookingData] = React.useState(item);
  console.log(bookingData)

  const deleteBookingDataFromShipperSide = async () => {
    let token1 = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios
      .delete(`${REST_API_LOCAL}/shipper/cancelBooking/${bookingData._id}`, {
        withCredentials: true,
        headers: headers,
      })
      .catch(function (error) {
        if (error.response) {

          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {

          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    let data = await response.data;
  };

  return (
    <View style={styles.container}>

      <View style={styles.card} >

        <View style={{ paddingBottom: 10 }}>
          <View style={styles.row}>
            <Text style={styles.dataAndTimeStyle} >
              {moment(bookingData.dateTime).utc().format("MMMM Do YYYY, h:mm a")}
            </Text>
            <Text style={styles.shipmentType}>
              {bookingData.shipmentDetails.type == "FTL"
                ? "FTL"
                : "LTL"}
            </Text>
          </View>
        </View>

        <Divider />

        <View style={styles.section}>
          <View>
            <Text style={styles.heading}>Pickup Location </Text>
            <Text style={styles.addressContainer}>
              {bookingData.pickupAddress.city},{" "}
              {bookingData.pickupAddress.street}
            </Text>

            {bookingData.status == 'Assigned' ? null : (
              <View>
                <Text style={styles.heading}>Dropoff Location </Text>
                <Text style={styles.addressContainer}>{bookingData.dropoffAddress.city},{" "}
                  {bookingData.dropoffAddress.street}{" "}
                </Text>
              </View>
            )}
          </View>
        </View>

        <Divider />

        <View style={styles.section}>

          <Text style={styles.heading}>Shipment Details</Text>

          <View style={styles.row}>
            <Text>Weight</Text>
            <Text style={styles.propertyStyle}>
              {bookingData.shipmentDetails.weight} kg
            </Text>
          </View>

          <View style={styles.row}>
            <Text>Insurance</Text>
            <Text style={styles.propertyStyle}>No</Text>
          </View>

          <View style={styles.row}>
            <Text>Quantity</Text>
            <Text style={styles.propertyStyle}>
              {bookingData.shipmentDetails.quantity} Pcs
            </Text>
          </View>

          <View style={styles.row}>
            <Text>Status</Text>
            <Text style={styles.propertyStyle}>{bookingData.status}</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.section}>
          <View style={styles.row}>
            <Text>Sub Total</Text>
            <Text style={styles.propertyStyle}>
              {bookingData.payment.amount} Rs
            </Text>
          </View>
          <View style={styles.row}>
            <Text>Insured Amount</Text>
            <Text style={styles.propertyStyle}>N/A</Text>
          </View>
          <View style={styles.row}>
            <Text>Tax</Text>
            <Text style={styles.propertyStyle}>N/A</Text>
          </View>
        </View>
        <Divider />

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={{ fontSize: 18 }}>Total</Text>
            <Text style={styles.paymentStyle}>
              {bookingData.payment.amount} PKR
            </Text>
          </View>
        </View>

      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Delete Booking Record", "Are you sure?", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Confirm",
                onPress: () => {
                  deleteBookingDataFromShipperSide();
                  navigation.goBack();
                },
              },
            ]);
          }}
          style={[styles.customButton, { backgroundColor: "#068E94" }]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={[styles.buttonText, { color: "white", },]}>
              Delete Booking
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.customButton, { backgroundColor: "#068E94" }]}
          onPress={() => {
            navigation.push("LiveTracking", bookingData);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: 'white',
                },
              ]}>
              Live Location
            </Text>
          </View>
        </TouchableOpacity>
        
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0EFF6",
    height: "100%",
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  customButton: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 20,
    elevation: 5,
  },
  card: {
    elevation: 5,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
  },
  section: {
    marginVertical: 10
  },
  heading: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#005761",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    alignItems: "center",
  },
  propertyStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentStyle:  {
    fontSize: 22,
    fontWeight: "bold",
    color: "#005761"
  },
  shipmentType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#005761"
  },
  addressContainer: {
    padding: 5,
  },
  dataAndTimeStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  customButton: {
    width: "45%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  locationSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },

});
