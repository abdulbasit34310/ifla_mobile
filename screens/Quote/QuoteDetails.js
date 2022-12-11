import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";

import { Divider } from "react-native-paper";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { REST_API_LOCAL } from "@env";

export default function QuoteDetails({ navigation, route }) {
 
  const [quoteData, setQuoteData] = React.useState(route.params.item);

  const deleteData = async () => {
    let token1 = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token1}` };

    const id = quoteData._id;
    let response = await axios.delete(
      `${REST_API_LOCAL}/shipper/deleteQuote/${id}`,
      { withCredentials: true, headers: headers }
    );
    console.log(response.data);
    console.log("Quote Deleted");
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginLeft: 20,
            color: "#005761",
          }}
        >
          {quoteData.shipmentDetails.Type == "FTL"
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
          {quoteData.dateTime}
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
              {quoteData.pickupAddress.city}
            </Text>
            <Text style={styles.addressContainer}>
              {quoteData.dropoffAddress.city}
            </Text>
          </View>
          <Divider />
          <View style={{ marginVertical: 25 }}>
            <View style={styles.propertyContainerStyle}>
              <Text>Weight</Text>
              <Text style={styles.propertyStyle}>
                {quoteData.shipmentDetails.weight} kg
              </Text>
            </View>

            <View style={styles.propertyContainerStyle}>
              <Text>Quantity</Text>
              <Text style={styles.propertyStyle}>
                {quoteData.shipmentDetails.quantity} Pcs
              </Text>
            </View>
            <View style={styles.propertyContainerStyle}>
              <Text>Insurance</Text>
              <Text style={styles.propertyStyle}>No</Text>
            </View>

            <View style={styles.propertyContainerStyle}>
              <Text>Packaging</Text>
              <Text style={styles.propertyStyle}>No</Text>
            </View>
          </View>
          <Divider />
          <View style={{ marginVertical: 20 }}>
            <View style={styles.propertyContainerStyle}>
              <Text>Sub Total</Text>
              <Text style={styles.propertyStyle}>
                {quoteData.payment.amount} Rs
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
              Rs {quoteData.payment.amount}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            Alert.alert("Create Booking", "Are you sure?", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Confirm",
                onPress: () => {
                  navigation.navigate("FreightBooking",  {screen: "ScheduleBooking", params:{ item: quoteData }});
                  // navigation.goBack();
                },
              },
            ]);
          }}
          style={{
            marginTop: 5,
            padding: 10,
            paddingVertical:15,
            marginBottom: 20,
            backgroundColor: "#068E94",
            width: 290,
            alignSelf: "center",
            borderRadius: 12,
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
            Create Booking
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert("Delete Quote Record", "Are you sure?", [
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
            marginTop: 10,
            padding: 10,
            paddingVertical:15,
            marginBottom: 20,
            backgroundColor: "#ef4436",
            width: 290,
            alignSelf: "center",
            borderRadius: 12,
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
            Delete Quote
          </Text>
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
});
