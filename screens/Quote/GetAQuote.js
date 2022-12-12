import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Card, Divider, Chip, TouchableRipple } from "react-native-paper";
import { ButtonGroup } from "react-native-elements";
import { Checkbox } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import SelectLocation from "../../components/ScheduleBooking/SelectLocation";
import ChooseTruck from "../../components/ScheduleBooking/ChooseTruck";
import { REST_API_LOCAL } from "@env";

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
  const [category, setCategory] = React.useState(2);
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

    let token = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token}` };

    await axios.post(
      REST_API_LOCAL + "/shipper/saveQuoteMobile",
      body,
      { withCredentials: true, headers: headers }
    );
    console.log("Saving Done!");
    showToastWithGravity();
    navigation.push("ViewQuotes", { insurance: route.params.insurance })
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Quote Saved",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <ScrollView style={{backgroundColor: Theme.SecondaryBackground}}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.flexView}>
            <TouchableRipple style={{ borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
              navigation.goBack();
            }}>
              <Entypo name='chevron-small-left' size={34} />
            </TouchableRipple>

            <TouchableRipple style={{ height:"100%", borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
              navigation.push("ViewQuotes", { insurance: route.params.insurance })
            }}>
              <Text>View Quotes</Text>
            </TouchableRipple>
        </View>
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

        <View style={styles.card}>
          <View>
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
              keyboardType="phone-pad"
              style={styles.textInput}
              onChangeText={(v) => {
                setQuote({ ...quoteData, weight: v });
              }}
            />
            <Text style={styles.buttonInsideText}>Quantity: </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="phone-pad"
              onChangeText={(v) => {
                setQuote({ ...quoteData, quantity: v });
              }}
            />
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

            <View
              style={{
                justifyContent: "center",
                margin: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  SaveQuote();
                  // navigation.goBack()

                }}
                style={[styles.customButton, { backgroundColor: "#068E94" }]}
              >
                <Text style={[
                  styles.buttonText,
                  {
                    color: "white",
                  },
                ]}>Save Quote</Text>

              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  textInput: {
    borderColor: Theme.PrimaryBackground,
    borderWidth: 1,
    padding: 15,
    marginLeft: 10,
    width: "90%",
    borderRadius: 4,
  },
  customButton: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  card: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 14,
    elevation: 5,
    justifyContent: "center",
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
  container: {
    // backgroundColor: Theme.SecondaryBackground,
    height: "100%",
    padding: 20,
    justifyContent: "center",
  },
  flexView:{
    flex:1,
    flexDirection:"row",
    paddingBottom: 15, paddingTop: 10,
    justifyContent:"space-between"
  }
});
