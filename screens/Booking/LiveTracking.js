import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, AppRegistry, Image, } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Callout, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API, REST_API_LOCAL } from "@env";
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.4;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LiveTracking = ({ route, navigation }) => {

  const [dropoffAddress, setData] = React.useState(route.params);

  const [state, setState] = React.useState({
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
    destination: {
      latitude: dropoffAddress.latitude,
      longitude: dropoffAddress.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    distance: 0,
    time: 0,
  });

  const fetchTimeDate = (d, t) => {
    updateState({
      distance: d,
      time: t
    })
  }

  const { currentLocation, time, distance, destination } = state;
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const mapRef = useRef < MapView > null;

  const fetchDriverLocation = async () => {
    const id = bookingData._id;
    let token = await SecureStore.getItemAsync("userToken");
    const response = await axios.get(`${REST_API_LOCAL}/drivers/getLocation/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // deconstruct
    const { latitude, longitude } = response.data;
    console.log("Driver Coordinate");
    console.log(latitude);
    console.log(longitude);
    // update the state
    updateState(
      {
        ...currentLocation,
        currentLocation: {
          latitude: latitude,
          longitude: longitude,
        }
      }
    )
    console.log("Putting Driver Coordinate above in current Location of use State");
    console.log(currentLocation.latitude);
    console.log(currentLocation.longitude);

    // setLatitude(latitude);
    // setLongitude(longitude);
  }

  React.useEffect(() => {
    fetchDriverLocation()
  }, [])

  return (
    <SafeAreaView style={styles.container}>

      <MapView style={StyleSheet.absoluteFill}
        initialRegion={{
          ...currentLocation,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>

        <MapViewDirections
          origin={{
            ...currentLocation,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          destination={destination}
          apikey={GOOGLE_API}
          strokeWidth={3}
          optimizeWaypoints={true}
          onReady={(args) => {
            fetchTimeDate(args.distance, args.duration),
              mapRef.current?.fitToCoordinates(args.coordinates, {
                edgePadding: {
                  // top: 70,
                  // right: 70,
                  // bottom: 70,
                  // left: 70,
                },
              });
          }}
        />

        <Marker coordinate={currentLocation} />
        <Marker coordinate={destination} />

      </MapView>
      <View style={styles.floatingButton}>
        {distance !== 0 && (
          <View>
            <Text>Distance left: {distance.toFixed(0)} km</Text>

            <Text>Time left: {time.toFixed(0)} min</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LiveTracking;

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: 'white',
    borderRadius: 14,
    elevation: 5,
    margin: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 19,
    backgroundColor: "#066145",
  },
});
