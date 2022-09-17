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
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from "react-native-paper";
import axios from "axios";
const API_ENDPOINT = "https://freight-automation-default-rtdb.firebaseio.com/";
import { REST_API, REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";

export default function ShipmentType({
  navigation,
  nextStep,
  bookingData,
  setBooking,
}) {
  const [type, setType] = React.useState(1);

  return (
    <View
      style={{
        backgroundColor: "#00ABB2",
        height: "100%",
        padding: 20,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: "#E0EFF6",
          borderRadius: 10,
          elevation: 24,
        }}
      >
        <Text style={{ marginBottom: 15 }}>Choose Shipment Type</Text>
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
            backgroundColor: "#068E94",
          }}
        />
        <TouchableOpacity onPress={nextStep} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#005761",
    borderWidth: 1,
    padding: 3,
    marginLeft: 10,
    width: "90%",
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
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  image: {
    flex: 1,
    justifyContent: "center",
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
    borderColor: "#005761",
    borderWidth: 1,
    marginBottom: 1,
    borderRadius: 10,
  },
});
