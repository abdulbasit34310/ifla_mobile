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

export default function TruckDetails({
  navigation,
  nextStep,
  prevStep,
  setDate,
  date,
  setBooking,
  bookingData,
  postData,
}) {
  const [checked, setChecked] = React.useState(false);

  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

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
        {/* <Text>TruckDetails</Text> */}
        <Text style={{ padding: 10 }}>Choose Date:</Text>
        <TouchableOpacity
          style={[styles.textInput, { padding: 5 }]}
          onPress={showDatepicker}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        <Text style={{ padding: 10 }}>Choose Time:</Text>
        <TouchableOpacity
          style={[styles.textInput, { padding: 5 }]}
          onPress={showTimepicker}
        >
          <Text>{date.toTimeString()}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={{ fontSize: 16 }}>Do you want to pack your items?</Text>
        </View>

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
          {checked ? (
            <TouchableOpacity onPress={nextStep} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
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
                      postData(false);
                      showToastWithGravity();
                    },
                  },
                ]);
              }}
            >
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          )}
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
