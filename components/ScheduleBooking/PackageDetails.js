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

export default function PackageDetails({
  navigation,
  nextStep,
  prevStep,
  setBooking,
  bookingData,
  postData,
}) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [type, setType] = React.useState("");
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Your Booking is Confirmed",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

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
        <Text>Package Details</Text>
        <Text style={{ padding: 10 }}>Name: </Text>
        <Picker
          selectedValue={selectedValue}
          style={[styles.textInput, { fontSize: 12 }]}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            setBooking({ ...bookingData, packageName: itemValue });
          }}
        >
          <Picker.Item label="Please Specify" value="" />
          <Picker.Item label="Normal" value="Normal" />
          <Picker.Item label="Premium" value="Premium" />
          <Picker.Item label="Extra Special" value="Extra Special" />
        </Picker>

        <Text style={{ padding: 10 }}>Choose Type:</Text>
        <Picker
          selectedValue={type}
          style={[styles.textInput, { fontSize: 12 }]}
          onValueChange={(itemValue, itemIndex) => {
            setType(itemValue);
            setBooking({ ...bookingData, packageType: itemValue });
          }}
        >
          <Picker.Item label="Please Specify" value="" />
          <Picker.Item label="Box" value="Box" />
          <Picker.Item label="Pallets" value="Pallets" />
          <Picker.Item label="Wooden" value="Wooden" />
          <Picker.Item label="Bagged" value="Bagged" />
        </Picker>

        <Text style={{ padding: 10 }}>Weight (kgs): </Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={(v) => {
            setBooking({ ...bookingData, packageWeight: v });
          }}
        />
        <Text style={{ padding: 10 }}>Dimensions (cm): </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ padding: 10 }}>Height: </Text>
          <TextInput
            keyboardType="numeric"
            style={{
              borderColor: "#005761",
              borderWidth: 1,
              padding: 3,
              marginLeft: 10,
              width: "20%",
              borderRadius: 4,
            }}
            onChangeText={(v) => {
              setBooking({ ...bookingData, packageHeight: v });
            }}
          />
          <Text style={{ padding: 10 }}>Width: </Text>
          <TextInput
            keyboardType="numeric"
            style={{
              borderColor: "#005761",
              borderWidth: 1,
              padding: 3,
              marginLeft: 10,
              width: "20%",
              borderRadius: 4,
            }}
            onChangeText={(v) => {
              setBooking({ ...bookingData, packageWidth: v });
            }}
          />
        </View>
        <Text style={{ padding: 10 }}>Package Length (kgs): </Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={(v) => {
            setBooking({ ...bookingData, packageLength: v });
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 15,
          }}
        >
          <TouchableOpacity onPress={prevStep} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              Alert.alert("Confirm Order", "Are you sure?", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    postData(true);
                    showToastWithGravity();
                  },
                },
              ]);
            }}
          >
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
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
