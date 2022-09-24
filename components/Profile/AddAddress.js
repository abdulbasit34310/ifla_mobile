import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GOOGLE_API } from "@env";
import marker from "../../assets/icons8-marker.png";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FAB } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

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

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
const REST_API_ENDPOINT = "http://192.168.0.103:4000";

export default function AddAddress({ setIsVisible, isVisible, isCompany }) {
  // const [pin, setPin] = React.useState({
  //   latitude: 33.6533,
  //   longitude: 73.0702,
  // });
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  const [location, setLocation] = React.useState({
    latitude: 33.6533,
    longitude: 73.0702,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isloading, setLoading] = useState(false);

  const animateToLocation = (region) => {
    mapRef.current.animateToRegion(region, 2 * 1000);
  };

  const onRegionChange = (region) => {
    setLocation(region);
  };

  const getCurrentLocationOfUser = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let getLocation = await Location.getCurrentPositionAsync({});
    const loc = {
      latitude: getLocation.coords.latitude,
      longitude: getLocation.coords.longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
    setLocation(loc);
    animateToLocation(loc);
  };

  const getAddress = async () => {
    setLoading(true);
    let getAddressFromLoc = await Location.reverseGeocodeAsync(location);
    console.log(getAddressFromLoc);
    let addressDetails = {
      building: getAddressFromLoc[0].name,
      street:
        getAddressFromLoc[0].street + ", " + getAddressFromLoc[0].district,
      city: getAddressFromLoc[0].city,
      country: getAddressFromLoc[0].country,
      latitude: location.latitude,
      longitude: location.longitude,
    };
    console.log(addressDetails);
    var body = { address: addressDetails };
    let token1 = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios.put(
      `${REST_API_ENDPOINT}/shipper/addAddress`,
      body,
      {
        withCredentials: true,
        headers: headers,
      }
    );
    const data = await response.data;
    // console.log(data);
    // setData(data);
    console.log(data);
    ToastAndroid.showWithGravity(
      "Address Added",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    setTimeout(() => {
      setIsVisible(false);
      setLoading(false);
    }, 3000);
  };
  const hideModal = () => {
    setIsVisible(false);
  };
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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
        onPress={hideModal}
      >
        <FontAwesome name="chevron-left" color="#005761" size={30} />
      </TouchableOpacity>
      <GooglePlacesAutocomplete
        placeholder="Your Address"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log(details);
          const region = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setLocation(region);
          animateToLocation(region);
        }}
        query={{
          key: GOOGLE_API,
          language: "en",
          components: "country:pk",
          types: "establishment",
          radius: 30000,
          location: `${location.latitude}, ${location.longitude}`,
        }}
        styles={{
          container: {
            flex: 1,
            position: "absolute",
            width: "100%",
            zIndex: 1,
            marginTop: 40,
          },
          listView: { backgroundColor: "white" },
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.6533,
          longitude: 73.0702,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={onRegionChange}
        ref={mapRef}
        provider="google"
      >
        {/* <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        /> */}
      </MapView>
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={marker} />
      </View>
      <SafeAreaView style={styles.footer}>
        <View style={styles.locationContainer}>
          <TouchableOpacity
            style={styles.locButtonStyle}
            onPress={getCurrentLocationOfUser}
          >
            <FontAwesome name="location-arrow" color="#005761" size={30} />
            {/* <Text style={styles.buttonText}>Get Your Current Location</Text> */}
          </TouchableOpacity>
        </View>
        {!isloading ? (
          <TouchableOpacity style={styles.buttonStyle} onPress={getAddress}>
            <Text style={styles.buttonText}>Add Address</Text>
          </TouchableOpacity>
        ) : (
          <FAB
            loading
            visible={isloading}
            style={{ backgroundColor: "teal" }}
            icon={{ name: "add", color: "white" }}
            size="small"
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    alignItems: "flex-end",
    display: "flex",
    margin: 20,
    marginBottom: 30,
  },
  locButtonStyle: {
    backgroundColor: Theme.WHITE,
    // padding: 5,
    borderRadius: 20,
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
