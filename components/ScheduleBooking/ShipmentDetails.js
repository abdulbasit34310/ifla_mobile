import * as React from "react";
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Modal, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { ButtonGroup } from "react-native-elements";
import { StatusBar } from 'expo-status-bar';
import SelectLocation from "./SelectLocation";
import ChooseTruck from "./ChooseTruck";
import { Card, Divider, Chip, TouchableRipple, Checkbox } from "react-native-paper";

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

export default function BookingDetails({
  navigation,
  nextStep,
  bookingData,
  setBooking,
  shipperInsurance
}) {
  const [isPickup, setIsPickup] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pickupAddress, setPickupAddress] = React.useState("");
  const [dropoffAddress, setDropoffAddress] = React.useState("");
  const [vehicle, setVehicle] = React.useState("");
  const [vehicleModal, setVehicleModal] = React.useState(false);
  const [type, setType] = React.useState(2);

  const fillToast = () => {
    if (Platform.OS == 'android') {
      ToastAndroid.showWithGravity(
        "Please Add Details First",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={{ paddingBottom: 15 }}>
        <TouchableRipple style={{ width: '12%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => { navigation.goBack() }}>
          <Entypo name='chevron-small-left' size={34} />
        </TouchableRipple>
      </View>

      <View style={styles.card}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          {isPickup ? (
            <SelectLocation
              address={pickupAddress}
              setAddress={setPickupAddress}
              isPickup={isPickup}
              isVisible={modalVisible}
              setIsVisible={setModalVisible}
              bookingData={bookingData}
              setBooking={setBooking}
              isQuote={false}
            />
          ) : (
            <SelectLocation
              address={dropoffAddress}
              setAddress={setDropoffAddress}
              isPickup={isPickup}
              isVisible={modalVisible}
              setIsVisible={setModalVisible}
              bookingData={bookingData}
              setBooking={setBooking}
              isQuote={false}
            />
          )}
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={vehicleModal}
          onRequestClose={() => {
            setVehicleModal(!vehicleModal);
          }}
        >
          <ChooseTruck
            setIsVisible={setVehicleModal}
            setSelectedVehicle={setVehicle}
            setBooking={setBooking}
            bookingData={bookingData}
            isQuote={false}
          />
        </Modal>

        <View>
          <Text style={styles.buttonInsideText}>Choose Shipment Type</Text>
          <ButtonGroup
            buttons={["Full Truck Load", "Less than Truck Load"]}
            selectedIndex={type}
            onPress={(value) => {
              setType(value);
              if (value === 0) {
                setBooking({ ...bookingData, type: "FTL" });
              } else {
                setBooking({ ...bookingData, type: "LTL" });
              }
            }}
            containerStyle={{
              backgroundColor: "white",
              height: 100,
              width: "90%",
              borderRadius: 10,
            }}
            buttonStyle={{ padding: 10, color: "black" }}
            selectedButtonStyle={{
              backgroundColor: Theme.PrimaryForeground,
            }}
          />
          <Text style={styles.buttonInsideText}>Pickup Location </Text>
          <TouchableOpacity
            style={[styles.textInput, { padding: 15 }]}
            onPress={() => {
              setIsPickup(true);
              setModalVisible(true);
            }}
          >
            <Text>
              {bookingData.pickupAddress === ""
                ? "Choose Location"
                : bookingData.pickupAddress.building +
                ", " +
                bookingData.pickupAddress.street +
                ", " +
                bookingData.pickupAddress.city +
                ", " +
                bookingData.pickupAddress.country}
            </Text>
          </TouchableOpacity>

          <Text style={styles.buttonInsideText}>Dropoff Location: </Text>

          <TouchableOpacity
            style={[styles.textInput]}
            onPress={() => {
              setIsPickup(false);
              setModalVisible(true);
            }}
          >
            <Text>
              {bookingData.dropoffAddress === ""
                ? "Choose Location"
                : bookingData.dropoffAddress.building +
                ", " +
                bookingData.dropoffAddress.street +
                ", " +
                bookingData.dropoffAddress.city +
                ", " +
                bookingData.dropoffAddress.country}
            </Text>
            {/* <Text>{dropoffCity === "" ? "Select City" : dropoffCity}</Text> */}
          </TouchableOpacity>
          {type === 1 ? null : (
            <View>
              <Text style={styles.buttonInsideText}>Select Vehicle Type: </Text>

              <TouchableOpacity
                style={[styles.textInput]}
                onPress={() => {
                  setVehicleModal(true);
                }}
              >
                <Text>
                  {bookingData.vehicle === ""
                    ? "Select Vehicle"
                    : bookingData.vehicle}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {shipperInsurance ? null : (<TouchableOpacity onPress={() => { setBooking({ ...bookingData, isInsured: true }); }}
            style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
          >
            <Checkbox
              status={bookingData.isInsured ? "checked" : "unchecked"}
              onPress={() => {
                // setChecked(!checked);
                setBooking({ ...bookingData, isInsured: true });
              }}
            />
            <Text style={{ fontSize: 16 }}>Do you want to have a insurance?</Text>
          </TouchableOpacity>)}


          <View
            style={{
              justifyContent: "center",
              margin: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (
                  bookingData.pickupAddress &&
                  bookingData.dropoffAddress &&
                  bookingData.type == "LTL" ||
                  (bookingData.vehicle && bookingData.type)
                ) {
                  nextStep();
                } else {
                  fillToast();
                }
              }}
              style={[styles.customButton, { backgroundColor: "#068E94" }]}
            >
              <Text style={[
                styles.buttonText,
                {
                  color: "white",
                },
              ]}>Next</Text>

            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.SecondaryBackground,
    height: "100%",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 14,
    elevation: 5,
    justifyContent: "center",
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
  textInput: {
    borderColor: Theme.PrimaryBackground,
    borderWidth: 1,
    padding: 15,
    marginLeft: 10,
    width: "90%",
    borderRadius: 4,
  },
  buttonStyle: {
    backgroundColor: Theme.PrimaryForeground,
    padding: 10,
    width: 100,
    borderRadius: 14,
    alignSelf: "center",
    marginTop: 20,
    elevation: 5,
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: Theme.PrimaryText,
  },

  buttonInsideText: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.PrimaryText,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
