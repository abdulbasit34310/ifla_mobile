import * as React from "react";
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Modal, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Checkbox } from "react-native-paper";

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

export default function ScheduleDetails({
  navigation,
  nextStep,
  prevStep,
  setDate,
  date,
  setBooking,
  bookingData,
  postData,
}) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [type, setType] = React.useState("");
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setBooking({ ...bookingData, date: currentDate });
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

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.card}>
        <ScrollView>
          <Text style={styles.header}>Schedule Details</Text>
          <Text style={styles.buttonInsideText}>Choose Date:</Text>
          <TouchableOpacity
            style={[styles.textInput, { padding: 5 }]}
            onPress={showDatepicker}
          >
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>
          <Text style={styles.buttonInsideText}>Choose Time:</Text>
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
              status={bookingData.package ? "checked" : "unchecked"}
              onPress={() => {
                // setChecked(!checked);
                setBooking({ ...bookingData, package: !bookingData.package });
              }}
            />
            <Text style={{ fontSize: 16 }}>Do you want to pack your items?</Text>
          </View>
          {bookingData.package && (
            <View style={{ marginTop: 40 }}>
              <Text style={styles.header}>Package Details</Text>
              <Text style={styles.buttonInsideText}>Package Name: </Text>
              <Picker
                selectedValue={bookingData.packageName}
                style={[styles.textInput, { fontSize: 12 }]}
                onValueChange={(itemValue, itemIndex) => {
                  // setSelectedValue(itemValue);
                  setBooking({ ...bookingData, packageName: itemValue });
                }}
              >
                <Picker.Item label="Please Specify" value="" />
                <Picker.Item label="Normal" value="Normal" />
                <Picker.Item label="Premium" value="Premium" />
                <Picker.Item label="Extra Special" value="Extra Special" />
              </Picker>

              <Text style={styles.buttonInsideText}>Package Type:</Text>
              <Picker
                selectedValue={bookingData.packageType}
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
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 15,
            }}
          >
            <TouchableOpacity onPress={prevStep} style={[styles.customButton, { backgroundColor: "#068E94" }]}
            >
              <Text style={[
                styles.buttonText,
                {
                  color: "white",
                },
              ]}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                nextStep();
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
        </ScrollView>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.SecondaryBackground,
    height: "100%",
    padding: 25,
    justifyContent: "center",
  },
  card: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
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
  customButton: {
    width: "47%",
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
