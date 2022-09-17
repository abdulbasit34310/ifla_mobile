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

export default function GoodsDetails({
  navigation,
  bookingData,
  nextStep,
  prevStep,
  setBooking,
}) {
  const [selectedValue, setSelectedValue] = React.useState("");

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#00ABB2",
        height: "100%",
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
        <Text>GoodsDetails</Text>
        <Text style={{ padding: 10 }}>Select Goods Type: </Text>
        <Picker
          selectedValue={selectedValue}
          style={[styles.textInput, { fontSize: 12 }]}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            setBooking({ ...bookingData, goodsType: itemValue });
          }}
        >
          <Picker.Item label="Please Specify" value="" />
          <Picker.Item label="Raw Materials" value="Raw Naterials" />
          <Picker.Item label="Electronics" value="Electronics" />
          <Picker.Item label="Agriculture" value="Agriculture" />
          <Picker.Item label="Clothing" value="Clothing" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Furniture" value="Furniture" />
        </Picker>

        <Text style={{ padding: 10 }}>Approx. Weight (kgs): </Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={(v) => {
            setBooking({ ...bookingData, weight: v });
          }}
        />
        <Text style={{ padding: 10 }}>Quantity: </Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={(v) => {
            setBooking({ ...bookingData, quantity: v });
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
              setBooking({ ...bookingData, height: v });
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
              setBooking({ ...bookingData, width: v });
            }}
          />
        </View>
        <Text style={{ padding: 10 }}>Length: </Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={(v) => {
            setBooking({ ...bookingData, length: v });
          }}
        />
        <Text style={{ padding: 10 }}>Goods Description: </Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.textInput, { height: 70 }]}
          onChangeText={(v) => {
            setBooking({ ...bookingData, description: v });
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
          <TouchableOpacity onPress={nextStep} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Next</Text>
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
