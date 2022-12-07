import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import {
  Animated,
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Divider, TouchableRipple } from "react-native-paper";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome5Brands,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as SecureStore from "expo-secure-store";
import { captureScreen } from "react-native-view-shot";

import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import moment from "moment";
import axios from "axios";
import { REST_API_LOCAL } from "@env";

export default function BookingDetails({ navigation, route }) {
  const [receivedData, setData] = React.useState(route.params);

  const [pickupCoordinates, setPickupCoordinates] = React.useState({
    latitude: receivedData.pickupAddress.latitude,
    longitude: receivedData.pickupAddress.longitude,
    status: receivedData.status,
    bookingId: receivedData._id,
  });

  const [dropOffCoordinates, setDropOffCoordinates] = React.useState({
    latitude: receivedData.dropoffAddress.latitude,
    longitude: receivedData.dropoffAddress.longitude,
    status: receivedData.status,
    bookingId: receivedData._id,
  });

  const savePDF = async (html) => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    }).then(
      async (uri, error) => {
        console.log("Image saved to", uri);
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          let abc = await MediaLibrary.createAssetAsync(uri).then((res) => {
            console.log(res);
            console.log("HERE2");
          });
        }
      }

      // (error) => console.error("Oops, snapshot failed", error)
    );
  };

  const deleteBookingData = async () => {
    let token = await SecureStore.getItemAsync("userToken");
    let response = await axios.delete(
      `${REST_API_LOCAL}/shipper/deleteBooking/${receivedData._id}`,
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    );
    let data = await response.data;
  };

  const deleteBookingDataFromShipperSide = async () => {
    let token1 = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios
      .delete(`${REST_API_LOCAL}/shipper/cancelBooking/${receivedData._id}`, {
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

  const [getFeedback, setFeedback] = React.useState();
  const [getRatings, setRatings] = React.useState(0);
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);

  const saveRatingAndFeedback = async () => {
    console.log("Ratings " + getRatings);
    console.log("Feedback " + getFeedback);

    let token = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get(`${REST_API_LOCAL}/users/getUser`, {
      withCredentials: true,
      headers: headers,
    });

    const id = response.data.personId._id;
    console.log("ID " + id);

    const body = {
      ratings: getRatings,
      feedback: getFeedback,
      shipperId: id,
      bookingId: receivedData._id,
    };

    console.log("Body: " + body);

    let response1 = await axios.patch(
      `${REST_API_LOCAL}/customerMobile/saveReviewAndFeedback`,
      body,
      { withCredentials: true, headers: headers }
    );
    console.log("Response.Data");
    console.log(response1.data);

    if (Platform.OS == "android") {
      ToastAndroid.showWithGravity(
        "Rating and Feedback Given",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    navigation.goBack();
  };

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                setRatings(item);
              }}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= getRatings
                    ? {
                        uri: "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png",
                      }
                    : {
                        uri: "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png",
                      }
                }
              ></Image>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const fetchDriverLocation = async () => {
    const id = receivedData._id;
    let token = await SecureStore.getItemAsync("userToken");
    const response = await axios.get(`${REST_API_LOCAL}/drivers/getLocation/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const address = response.data;

    navigation.push("LiveTracking", { driverLocation:address ,dropoffAddress:dropOffCoordinates})
  }


  return (
    <ScrollView style={{ backgroundColor: "#E0EFF6" }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 15,
          }}
        >
          <TouchableRipple
            style={{
              width: "12%",
              borderRadius: 14,
              padding: 7,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="chevron-small-left" size={34} />
          </TouchableRipple>

          {receivedData.status == "Completed" ? (
            <TouchableRipple
              style={{
                width: "12%",
                borderRadius: 14,
                padding: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                deleteBookingDataFromShipperSide();
                navigation.popToTop();
              }}
            >
              <MaterialCommunityIcons
                name="delete-sweep"
                size={28}
                color={"#C00001"}
              />
            </TouchableRipple>
          ) : null}
        </View>

        <View style={styles.card}>
          <View style={{ paddingBottom: 10 }}>
            <View style={styles.row}>
              <Text style={styles.dataAndTimeStyle}>
                {moment(receivedData.dateTime)
                  .utc()
                  .format("MMMM Do YYYY, h:mm a")}
              </Text>
              <Text style={styles.shipmentType}>
                {receivedData.shipmentDetails.type == "FTL" ? "FTL" : "LTL"}
              </Text>
            </View>
          </View>
          <Divider />

          <View style={styles.section}>
            <View>
              <Text style={styles.heading}>Pickup Location </Text>
              <Text style={styles.addressContainer}>
                {receivedData.pickupAddress.city},{" "}
                {receivedData.pickupAddress.street}
              </Text>

              <View>
                <Text style={styles.heading}>Dropoff Location </Text>
                <Text style={styles.addressContainer}>
                  {receivedData.dropoffAddress.city},{" "}
                  {receivedData.dropoffAddress.street}{" "}
                </Text>
              </View>
            </View>
          </View>

          <Divider />

          <View style={styles.section}>
            <Text style={styles.heading}>Shipment Details</Text>
            <View style={styles.row}>
              <Text>Weight</Text>
              <Text style={styles.propertyStyle}>
                {receivedData.shipmentDetails.weight} kg
              </Text>
            </View>

            <View style={styles.row}>
              <Text>Insurance</Text>
              <Text style={styles.propertyStyle}>No</Text>
            </View>

            <View style={styles.row}>
              <Text>Quantity</Text>
              <Text style={styles.propertyStyle}>
                {receivedData.shipmentDetails.quantity} Pcs
              </Text>
            </View>

            <View style={styles.row}>
              <Text>Status</Text>
              <Text style={styles.propertyStyle}>{receivedData.status}</Text>
            </View>
          </View>

          <Divider />

          <View style={styles.section}>
            <View style={styles.row}>
              <Text>Sub Total</Text>
              <Text style={styles.propertyStyle}>
                {receivedData.payment.amount} Rs
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
                {receivedData.payment.amount} PKR
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.customButton, { backgroundColor: "#068E94" }]}
          onPress={() => {
            navigation.navigate("BillofLading", receivedData);
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="payments" size={18} color={"white"} />
            <Text
              style={[
                styles.buttonText,
                {
                  color: "white",
                },
              ]}
            >
              Bill of Lading
            </Text>
          </View>
        </TouchableOpacity>

        {receivedData.status == "Pending" ? (
          <TouchableOpacity
            style={[styles.customButton, { backgroundColor: "#068E94" }]}
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
                    deleteBookingData();
                    navigation.popToTop();
                  },
                },
              ]);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="cancel" size={18} color={"white"} />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "white",
                  },
                ]}
              >
                Cancel Booking
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        {receivedData.payment.status == "Created" ? (
          <TouchableOpacity
            style={[styles.customButton, { backgroundColor: "#068E94" }]}
            onPress={() => {
              navigation.navigate("Payments", { screen:"PaymentMethod", params:{
                payId: receivedData.payment._id,
              } });
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="payments" size={18} color={"white"} />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "white",
                  },
                ]}
              >
                Pay Now
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        {receivedData.status == "Assigned" ? (
          <TouchableOpacity
            style={[styles.customButton, { backgroundColor: "#068E94" }]}
            onPress={() => {fetchDriverLocation(); }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="md-location" size={18} color={"white"} />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "white",
                  },
                ]}
              >
                Live Tracking
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        {receivedData.status == "Completed" ? (
          <View>
            <View
              style={{
                paddingTop: 10,
              }}
            >
              <Text style={{ fontSize: 27, paddingTop: 10 }}>
                Rate Your Experience
              </Text>
              <Text style={{ fontSize: 12, color: "grey", marginTop: 8 }}>
                Are you satisfied with the service?
              </Text>
              <CustomRatingBar />
            </View>

            <TextInput
              style={styles.ti}
              placeholder="Tell us on how can we improve..."
              placeholderTextColor="#666666"
              onChangeText={(text) => setFeedback(text)}
            ></TextInput>

            <View>
              <TouchableOpacity
                style={[styles.customButton, { backgroundColor: "#068E94" }]}
                onPress={saveRatingAndFeedback}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: "white",
                    },
                  ]}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0EFF6",
    height: "100%",
    padding: 20,
  },
  card: {
    elevation: 5,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
  },
  dataAndTimeStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  shipmentType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#005761",
  },
  addressContainer: {
    padding: 5,
  },
  customRatingBarStyle: {
    marginVertical: 15,
    flexDirection: "row",
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
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
  section: {
    marginVertical: 10,
  },
  paymentStyle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#005761",
  },
  button: {
    marginTop: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#068E94",
    width: 200,
    alignSelf: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#005761",
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
    marginBottom: '2%',
    elevation: 5,
  },
  to: {
    backgroundColor: "#068E94",
    marginTop: 25,
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    elevation: 5,
  },
  ti: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 5,
    height: "30%",
    padding: 10,
  },
});
