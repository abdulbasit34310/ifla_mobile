import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ToastAndroid,
} from "react-native";

import { ButtonGroup } from "react-native-elements";
import { Checkbox } from "react-native-paper";
import axios from "axios";
import { REST_API, REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";
import SelectLocation from "../../components/ScheduleBooking/SelectLocation";
import ChooseTruck from "../../components/ScheduleBooking/ChooseTruck";
const REST_API_ENDPOINT =
  "http://192.168.0.103:4000/shipper" || REST_API + "/shipper";

const CITIES_API_ENDPOINT =
  "https://freight-automation-default-rtdb.firebaseio.com/";
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
export default function GetAQuote({ route, navigation }) {
  const [category, setCategory] = React.useState(0);
  const [isPickup, setIsPickup] = React.useState(true);
  const [vehicleModal, setVehicleModal] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pickupAddress, setPickupAddress] = React.useState("");
  const [dropoffAddress, setDropoffAddress] = React.useState("");
  const [vehicle, setVehicle] = React.useState("");

  // const [vehicleType, setVehicleType] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  //const [token,setToken] = React.useState(route.params.token)

  const [quoteData, setQuote] = React.useState({
    type: "LTL",
    pickupAddress: "",
    dropoffAddress: "",
    weight: "",
    quantity: "",
    package: false,
    vehicle: "",
  });

  const SaveQuote = async () => {
    const body = quoteData;
    console.log(quoteData);
    var obj = quoteData;
    let token1 = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token1}` };

    var response = await axios.post(
      REST_API_ENDPOINT + "/saveQuoteMobile",
      body,
      { withCredentials: true, headers: headers }
    );
    var data = response.data;
    console.log(data);
    console.log("Saving Done!");
    showToastWithGravity();
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Quote Saved",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.push("ViewQuotes");
          }}
          style={{
            backgroundColor: "white",
            padding: 10,
            marginLeft: 10,
            borderRadius: 10,
          }}
        >
          <Text>View Quotes</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View>
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
            bookingData={quoteData}
            setBooking={setQuote}
            isQuote={true}
          />
        ) : (
          <SelectLocation
            address={dropoffAddress}
            setAddress={setDropoffAddress}
            isPickup={isPickup}
            isVisible={modalVisible}
            setIsVisible={setModalVisible}
            bookingData={quoteData}
            setBooking={setQuote}
            isQuote={true}
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
          setBooking={setQuote}
          bookingData={quoteData}
          isQuote={true}
        />
      </Modal>
      <View
        style={{
          padding: 20,
          justifyContent: "center",
          backgroundColor: "#E0EFF6",
          height: "100%",
        }}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
            elevation: 24,
          }}
        >
          <ButtonGroup
            buttons={["Less than Truckload", "Full Truckload"]}
            selectedIndex={category}
            onPress={(value) => {
              setCategory(value);
              if (value === 0) {
                setQuote({ ...quoteData, Type: "LTL" });
              } else {
                setQuote({ ...quoteData, Type: "FTL" });
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
              backgroundColor: "#00ABB2",
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
              {quoteData.pickupAddress === ""
                ? "Choose Location"
                : quoteData.pickupAddress.building +
                  ", " +
                  quoteData.pickupAddress.street +
                  ", " +
                  quoteData.pickupAddress.city +
                  ", " +
                  quoteData.pickupAddress.country}
            </Text>
          </TouchableOpacity>
          <Text style={styles.buttonInsideText}>Dropoff Location: </Text>
          <TouchableOpacity
            style={[styles.textInput, { padding: 15 }]}
            onPress={() => {
              setIsPickup(false);
              setModalVisible(true);
            }}
          >
            <Text>
              {quoteData.dropoffAddress === ""
                ? "Choose Location"
                : quoteData.dropoffAddress.building +
                  ", " +
                  quoteData.dropoffAddress.street +
                  ", " +
                  quoteData.dropoffAddress.city +
                  ", " +
                  quoteData.dropoffAddress.country}
            </Text>

            {/* <Text>{dropoffCity === "" ? "Select City" : dropoffCity}</Text> */}
          </TouchableOpacity>
          <Text style={styles.buttonInsideText}>Select Vehicle Type: </Text>
          <TouchableOpacity
            style={[styles.textInput, { padding: 15 }]}
            onPress={() => {
              setVehicleModal(true);
            }}
          >
            <Text>
              {quoteData.vehicle === "" ? "Select Vehicle" : quoteData.vehicle}
            </Text>
          </TouchableOpacity>

          <Text style={styles.buttonInsideText}>Weight (kg): </Text>
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(v) => {
              setQuote({ ...quoteData, weight: v });
            }}
          />
          <Text style={styles.buttonInsideText}>Quantity: </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(v) => {
              setQuote({ ...quoteData, quantity: v });
            }}
          />
          {/* <Text style={{ padding: 10 }}>Pickup City: </Text>
          <TouchableOpacity
            style={[styles.textInput, { padding: 5 }]}
            onPress={() => {
              setIsPickup(true);
              setModalVisible(true);
            }}
          >
            <Text>{pickupCity === "" ? "Select City" : pickupCity}</Text>
          </TouchableOpacity>

          <Text style={{ padding: 10 }}>Dropoff City: </Text>
          <TouchableOpacity
            style={[styles.textInput, { padding: 5 }]}
            onPress={() => {
              setIsPickup(false);
              setModalVisible(true);
            }}
          >
            <Text>{dropoffCity === "" ? "Select City" : dropoffCity}</Text>
          </TouchableOpacity> */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{ fontSize: 16 }}>
              Do you want to pack your items?
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#068E94",
              padding: 10,
              width: 100,
              borderRadius: 10,
              alignSelf: "center",
              marginTop: 20,
            }}
            onPress={() => {
              SaveQuote();
              navigation.goBack();
            }}
          >
            <Text style={{ alignSelf: "center", color: "white" }}>
              Save Quote
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    borderColor: "#068E94",
    borderWidth: 1,
    padding: 3,
    marginLeft: 10,
    width: "90%",
    borderRadius: 4,
  },
  textInput2: {
    borderColor: "#068E94",
    borderWidth: 1,
    padding: 3,
    marginLeft: 10,
    width: "20%",
    borderRadius: 4,
  },
  buttonStyle: {
    backgroundColor: "#068E94",
    padding: 10,
    width: 100,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },

  buttonInsideText: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.PrimaryText,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  checkBoxContainer: {
    borderWidth: 0,
    padding: 0,
    backgroundColor: "white",
  },
  centeredView: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  countryLabel: {
    width: "100%",
    padding: 10,
    borderColor: "#068E94",
    borderWidth: 1,
    marginBottom: 1,
    borderRadius: 10,
  },
});
