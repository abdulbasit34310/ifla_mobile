import React, { useState, useRef, useEffect } from "react";
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Modal, Picker, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'expo-status-bar';

import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import sourceTruck from "../../assets/TruckMarker-01.png";
import sourceMarker from "../../assets/source.png";

import { GOOGLE_API } from "@env";
import QRCode from "qrcode";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Theme = {
  Buttons: "#068E94",
  PrimaryForeground: "#068E94",
  SecondaryForeground: "#00ABB2",
  PrimaryBackground: "#005761",
  SecondaryBackground: "#E0EFF6",
  PrimaryText: "#005761",
  BLACK: "#00000",
  WHITE: "#FFFFFF",
};

export default function PreviewBooking({
  bookingData,
  setBooking,
  nextStep,
  prevStep,
  postData,
  navigation
}) {
  const [state, setState] = React.useState({
    curLoc: {
      latitude: bookingData.pickupAddress.latitude,
      longitude: bookingData.pickupAddress.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    destinationCords: {
      latitude: bookingData.dropoffAddress.latitude,
      longitude: bookingData.dropoffAddress.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    distance: 0,
  });
  const [qrCode, setQrCode] = React.useState("");
  const fetchTime = (d) => {
    updateState({
      distance: d,
    });
    setBooking({ ...bookingData, distance: d });
  };
  const saveBooking = () => {
    Alert.alert("Confirm Booking", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          postData();
        },
      },
    ]);
  };

  const { curLoc, distance, destinationCords } = state;
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const mapRef = useRef();

  const animateToLocation = (region) => {
    mapRef.current.animateToRegion(region, 2 * 1000);
  };

  useEffect(() => {

    QRCode.toDataURL("I am a pony!")
      .then((url) => {
        console.log(url);
      })
      .catch((err) => {
        console.error(err);
      });
    var segs = [
      { data: "ABCDEFG", mode: "alphanumeric" },
      { data: "0123456", mode: "numeric" },
    ];

    QRCode.toDataURL(segs, function (err, url) {
      console.log(url);
    });
    animateToLocation(curLoc);
    animateToLocation(destinationCords);
  }, []);

  return (

    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <StatusBar style="dark" /> */}

      <MapView style={styles.map} initialRegion={curLoc} ref={mapRef}>
        <MapViewDirections
          origin={curLoc}
          destination={destinationCords}
          apikey={GOOGLE_API}
          strokeWidth={3}
          optimizeWaypoints={true}
          onReady={(args) => {
            console.log(`Distance: ${args.distance} km`);
            fetchTime(args.distance),
              mapRef.current?.fitToCoordinates(args.coordinates, {
                edgePadding: {
                  top: 70,
                  right: 70,
                  bottom: 70,
                  left: 70,
                },
              });
          }}
        />
        <Marker coordinate={curLoc}>
          <Image source={sourceTruck} style={{ width: 26, height: 28 }}></Image>
        </Marker>
        <Marker coordinate={destinationCords} />
      </MapView>

      <View
        style={{ borderRadius: 14, backgroundColor: "#E0EFF6", padding: 5, marginLeft: 25, position: 'absolute', top: 25 }}
      >
        <TouchableOpacity
          // style={{ backgroundColor: "#E0EFF6", }}
          onPress={() => { prevStep() }}>
          <Ionicons name='md-chevron-back-circle-outline' size={34} />
        </TouchableOpacity>
      </View>

      <Animatable.View animation="fadeInUp"
        style={styles.footer}>

        {distance !== 0 && (

          <View style={[styles.row, { paddingBottom: 10 }]}>
            <View>
              <Text style={styles.heading}>Distance</Text>
              <Text style={styles.property}>{distance.toFixed(0)} km</Text>
            </View>
          </View>

        )}

        <View style={[styles.row, { paddingBottom: 10 }]}>
          <View>
            <Text style={styles.heading}>Weight: </Text>
            <Text style={styles.property}>{bookingData.weight} kg</Text>
          </View>
          {bookingData.type == "LTL" ? null:(
          <View>
            <Text style={styles.heading}>Vehicle Type: </Text>
            <Text style={styles.property}>{bookingData.vehicle} </Text>
          </View>
          )}
        </View>

        <View style={[styles.row, { paddingBottom: 10 }]}>
          <View>
            <Text style={styles.heading}>Shipment Type: </Text>
            <Text style={styles.property}> {bookingData.type} </Text>
          </View>
        </View>


        <TouchableOpacity onPress={saveBooking}
          style={[styles.customButton, { backgroundColor: "#068E94" }]}
        >
          <Text style={[
            styles.buttonText,
            {
              color: "white",
            },
          ]}>Confirm Booking</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 19,
    // backgroundColor: "#066145",
  }, row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  }, heading: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#AAAAAA",
  }, property: {
    fontSize: 19,
    fontWeight: "bold",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
  buttonText: {
    color: Theme.WHITE,
    textAlign: "center",
    fontSize: 20,
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
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: "white",
    padding: 20,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    justifyContent: 'center',
    width: "100%",
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
  },
  region: {
    color: "#fff",
    lineHeight: 40,
    margin: 20,
  },
  locationContainer: {
    justifyContent: "center",
    // alignItems: "flex-end",
    backgroundColor: "white",
    display: "flex",

    width: "100%",
    height: "100%",
  },
  locButtonStyle: {
    backgroundColor: Theme.WHITE,
    // padding: 5,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: 2,
    height: 50,
    width: 50,
    padding: 3,
  },
});
