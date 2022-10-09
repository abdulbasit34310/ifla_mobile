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
  ScrollView,
} from "react-native";

import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { ThemeConsumer } from "react-native-elements";

import TruckIcon from "../../assets/Truck.png";
import ContainerIcon from "../../assets/Container.png";
import MazdaIcon from "../../assets/Mazda.png";
import PickupIcon from "../../assets/Pickup.png";
import SuzukiIcon from "../../assets/Suzuki.png";
import TankerIcon from "../../assets/Tanker.png";
import TrailerIcon from "../../assets/Trailer.png";

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

const TruckData = [
  { name: "Pickup", icon: PickupIcon, description: "1 tonn" },
  { name: "Suzuki", icon: SuzukiIcon, description: "2 tonn" },
  { name: "Mazda", icon: MazdaIcon, description: "4 tonn" },
  { name: "Truck", icon: TruckIcon, description: "12 tonn" },
  { name: "Trailer", icon: TrailerIcon, description: "33 tonn" },
  { name: "Container", icon: ContainerIcon, description: "33 tonn" },
  { name: "Tanker", icon: TankerIcon, description: "3000 gallon" },
];

export default function ChooseTruck({
  setIsVisible,
  setSelectedVehicle,
  bookingData,
  setBooking,
}) {
  const [selected, setSelected] = useState();
  const hideModal = () => {
    setIsVisible(false);
  };
  const setVehicle = () => {
    if (selected) {
      setSelectedVehicle(TruckData[selected - 1].name);
      setBooking({ ...bookingData, vehicle: TruckData[selected - 1].name });
      setIsVisible(false);
    } else {
      ToastAndroid.showWithGravity(
        "Please Select Vehicle First",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ display: "flex", flexDirection: "row", paddingTop: 10 }}>
          <TouchableOpacity
            style={{ padding: 5, margin: 3, width: 40 }}
            onPress={hideModal}
          >
            <FontAwesome name="chevron-left" color="#005761" size={30} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              color: Theme.PrimaryText,
              fontWeight: "bold",
              margin: 5,
            }}
          >
            Choose Vehicle
          </Text>
        </View>

        <View style={styles.innerContainer}>
          {TruckData.map((truck, index) => (
            <TouchableOpacity
              key={index + 1}
              style={
                index + 1 === selected
                  ? styles.buttonStyleSelected
                  : styles.buttonStyle
              }
              onPress={() => setSelected(index + 1)}
            >
              <Image style={styles.iconStyle} source={truck.icon} />
              <View style={{ marginLeft: 30, marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {truck.name}
                </Text>
                <Text style={{ fontSize: 14, color: Theme.PrimaryText }}>
                  Capacity: {truck.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.button} onPress={setVehicle}>
            <Text style={styles.buttonText}>Select Vehicle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonStyle: {
    // padding: 5,
    // justifyContent: "center",
    // alignItems: "center",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    padding: 5,
    height: 90,
    marginTop: 2,
  },
  buttonStyleSelected: {
    // padding: 5,
    // justifyContent: "center",
    // alignItems: "center",
    borderWidth: 2,
    borderColor: Theme.PrimaryBackground,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    padding: 5,
    height: 90,

    marginTop: 2,
  },
  iconStyle: {
    height: 80,
    width: 80,
    marginLeft: 5,
  },
  buttonText: {
    color: Theme.WHITE,
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: Theme.PrimaryForeground,
    // padding: 5,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: 7,
    height: 50,
    width: "100%",
  },
});
