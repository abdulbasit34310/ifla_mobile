import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import sourceTruck from "../../assets/TruckMarker-01.png";
import sourceMarker from "../../assets/source.png";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GOOGLE_API } from "@env";
import { useEffect } from "react";
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
    // QRCode.toDataURL(
    //   "some text",
    //   { errorCorrectionLevel: "H" },
    //   function (err, url) {
    //     console.log(url);
    //   }
    // );
    var segs = [
      { data: "ABCDEFG", mode: "alphanumeric" },
      { data: "0123456", mode: "numeric" },
    ];

    QRCode.toDataURL(segs, function (err, url) {
      console.log(url);
    });
    // var typeNumber = 4;
    // var errorCorrectionLevel = "H";
    // // var qr = qrcode(typeNumber, errorCorrectionLevel);
    // // const jsonData = JSON.stringify(bookingData);
    // // qr.addData(jsonData);
    // // qr.make();
    // console.log(qr.createImgTag());
    // // console.log(qr.createImgTag());
    // console.log(qr.createDataURL());

    // setQrCode(qr.createDataURL());

    animateToLocation(curLoc);
    animateToLocation(destinationCords);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity
        style={{
          padding: 5,
          margin: 3,
          width: 40,
          flex: 1,
          position: "absolute",
          zIndex: 1,
        }}
        onPress={() => {
          prevStep();
        }}
      >
        <FontAwesome name="chevron-left" color="#005761" size={30} />
      </TouchableOpacity>

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

      <SafeAreaView style={styles.footer}>
        <View>
          <View style={{ padding: 14 }}>
            <Text style={{ fontSize: 18, color: Theme.PrimaryText }}>
              Vehicle Type: {bookingData.vehicle}
            </Text>
            <Text style={{ fontSize: 18, color: Theme.PrimaryText }}>
              Weight : {bookingData.weight} kg
            </Text>
            <Text style={{ fontSize: 18, color: Theme.PrimaryText }}>
              Shipment Type: {bookingData.type}
            </Text>
            {distance !== 0 && (
              <View>
                <Text style={{ fontSize: 18, color: Theme.PrimaryText }}>
                  Distance: {distance} km
                </Text>
              </View>
            )}
          </View>
          <View>
            {/* <ImageBackground
              source={{ uri: qrCode }}
              style={{ height: 125, width: 125 }}
              imageStyle={{ borderRadius: 90 }}
            ></ImageBackground> */}
          </View>
        </View>

        <TouchableOpacity style={styles.buttonStyle} onPress={saveBooking}>
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 19,
    backgroundColor: "#066145",
  },
  buttonStyle: {
    backgroundColor: Theme.PrimaryForeground,
    // padding: 5,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: 2,
    height: 50,
    width: "100%",
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
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
    bottom: 10,
    position: "absolute",
    width: "100%",
  },
  region: {
    color: "#fff",
    lineHeight: 40,
    margin: 20,
  },
  buttonStyle: {
    backgroundColor: Theme.PrimaryForeground,
    // padding: 5,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: 2,
    height: 50,
    width: "100%",
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
  buttonText: {
    color: Theme.WHITE,
    textAlign: "center",
    fontSize: 20,
  },
});
