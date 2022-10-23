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
  const deleteData = async () => {
    let token1 = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios
      .delete(`${REST_API_LOCAL}/shipper/cancelBooking/${bookingData._id}`, {
        withCredentials: true,
        headers: headers,
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    let data = await response.data;
  };

  return (
    <ScrollView style={{ backgroundColor: "#E0EFF6" }}>

      <View style={styles.container}>
        <Text
          style={{
            fontSize: 26,
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

        <Card style={styles.card} >
          <View style={styles.locationSection}>

            <SafeAreaView style={{width:"50%"}}>
              <Text>
                <FontAwesome name="location-arrow" color="#005761" size={18} />{" "}
                Source
              </Text>
              <Text>
                {bookingData.pickupAddress.city},{" "}
                {bookingData.pickupAddress.building}{" "}
                {bookingData.pickupAddress.street}
              </Text>
            </SafeAreaView>

            <View>
            </View>

            <SafeAreaView style={{width:"50%"}}>
              <Text>
                <FontAwesome name="map-marker" color="#005761" size={18} />{" "}
                Destination
              </Text>
              <Text>
                {bookingData.dropoffAddress.city}{" "}
                {bookingData.dropoffAddress.building}{" "}
                {bookingData.dropoffAddress.street}{" "}
              </Text>
            </SafeAreaView>
          </View>

          <Divider />

          <View style={{ paddingBottom: 5 }}>
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

          <View style={{ paddingBottom: 5 }}>
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

        </Card>

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
                  deleteData();
                  navigation.goBack();
                },
              },
            ]);
          }}
          style={{
            marginTop: 20,
            padding: 10,
            marginBottom: 20,
            backgroundColor: "#068E94",
            width: 200,
            alignSelf: "center",
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Delete Booking
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
                style={styles.customButton}
                onPress={() => {
                  navigation.push("LiveTracking", bookingData);
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="truck-delivery-outline" size={22} color={'white'} />
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: 'white',
                      },
                    ]}>
                    Live Location
                  </Text>
                </View></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:
  {
    backgroundColor: "#E0EFF6",
    height: "100%",
    padding: 15
  },
  propertyContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    alignItems: "center",
  },
  propertyStyle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  paymentStyle:
  {
    fontSize: 22,
    fontWeight: "bold",
    color: "#005761"
  },
  card: {
    elevation: 3,
    backgroundColor: "white",
    margin: 15,
    padding: 20,
    borderRadius: 14,
  },
  customButton: {
    backgroundColor: "#005761",
    padding: 5,
    borderRadius: 14,
    elevation: 3,
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
