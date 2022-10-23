import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  Modal,
  ToastAndroid,
} from "react-native";
import { ButtonGroup } from "react-native-elements";
import SelectLocation from "./SelectLocation";
import ChooseTruck from "./ChooseTruck";

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
}) {
  const [isPickup, setIsPickup] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pickupAddress, setPickupAddress] = React.useState("");
  const [dropoffAddress, setDropoffAddress] = React.useState("");
  const [vehicle, setVehicle] = React.useState("");
  const [vehicleModal, setVehicleModal] = React.useState(false);
  const [type, setType] = React.useState(1);

  const fillToast = () => {
    ToastAndroid.showWithGravity(
      "Please Add Details First",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <View style={styles.mainContainer}>

      <View style={styles.childContainer}>

        <Text style={styles.header}>Booking Details</Text>

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

        <View style={{ marginTop: 40 }}>
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
                  bookingData.vehicle &&
                  bookingData.type
                ) {
                  nextStep();
                } else {
                  fillToast();
                }
              }}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Theme.SecondaryBackground,
    height: "100%",
    padding: 20,
    justifyContent: "center",
  },
  childContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 24,
    height: "95%",
    justifyContent: "center",
    display: "flex",
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
    elevation: 3,
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: Theme.PrimaryText,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
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
