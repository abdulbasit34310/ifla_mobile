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

export default function AddressDetails({
  navigation,
  nextStep,
  prevStep,
  bookingData,
  setBooking,
}) {
  const [getText, setText] = React.useState();
  const [isPickup, setIsPickup] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pickupCity, setPickupCity] = React.useState("");
  const [dropoffCity, setDropoffCity] = React.useState("");
  const [citiesData, setCitiesData] = React.useState();
  const [selectedValue, setSelectedValue] = React.useState("");

  const getCitiesData = async () => {
    const response = await fetch(`${API_ENDPOINT}/cities.json`);
    const data = await response.json();
    var arr;
    var arr2 = [];
    for (let key in data) {
      arr = data[key];
    }
    arr.forEach((element) => {
      arr2.push(element.city);
    });

    setCitiesData(arr2);
    setText(arr2);
  };

  React.useEffect(
    () => {
      getCitiesData();
    },
    [setCitiesData],
    [setText]
  );

  const filter = (text) => {
    // console.log(getCitiesData);
    var result = getText.filter((city) => {
      if (city.includes(text)) {
        return city;
      }
    });
    // console.log(result);
    setCitiesData(result);
  };
  const setPickup = (item) => {
    setPickupCity(item);
    setBooking({ ...bookingData, pickupCity: item });
    setModalVisible(!modalVisible);
  };

  const setDropOff = (item) => {
    setDropoffCity(item);
    setBooking({ ...bookingData, dropoffCity: item });
    setModalVisible(!modalVisible);
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
        <Text>Address Details</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Enter City Name"
                style={{ padding: 5, width: "80%" }}
                onChangeText={(v) => {
                  filter(v);
                }}
              />
              <FlatList
                style={{ width: "100%" }}
                refreshing={false}
                onRefresh={getCitiesData}
                keyExtractor={(item, index) => index}
                data={citiesData}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={styles.countryLabel}
                    onPress={() => {
                      isPickup ? setPickup(item) : setDropOff(item);
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Text style={{ padding: 10 }}>Pickup City: </Text>
        <TouchableOpacity
          style={[styles.textInput, { padding: 5 }]}
          onPress={() => {
            setIsPickup(true);
            setModalVisible(true);
          }}
        >
          <Text>{pickupCity === "" ? "Select City" : pickupCity}</Text>
        </TouchableOpacity>

        <Text style={{ padding: 10 }}>Pickup Address: </Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.textInput, { height: 70 }]}
          onChangeText={(v) => {
            setBooking({ ...bookingData, pickupAddress: v });
          }}
        />
        <Text style={{ padding: 10 }}>Dropoff City: </Text>
        <TouchableOpacity
          style={[styles.textInput, { padding: 5 }]}
          onPress={() => {
            setIsPickup(false);
            setModalVisible(true);
          }}
        >
          <Text>{dropoffCity === "" ? "Select City" : dropoffCity}</Text>
        </TouchableOpacity>
        <Text style={{ padding: 10 }}>Dropoff Address: </Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.textInput, { height: 70 }]}
          onChangeText={(v) => {
            setBooking({ ...bookingData, dropoffAddress: v });
          }}
        />

        <Text style={{ padding: 10 }}>Select Vehicle Type: </Text>
        <Picker
          selectedValue={selectedValue}
          style={[styles.textInput, { fontSize: 12 }]}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            setBooking({ ...bookingData, GoodsType: itemValue });
          }}
        >
          <Picker.Item label="Please Specify" value="" />
          <Picker.Item label="Truck" value="Truck" />
          <Picker.Item label="Shehzore" value="Shehzore" />
          <Picker.Item label="Mazda" value="Mazda" />
          <Picker.Item label="Suzuki" value="Suzuki" />
        </Picker>

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
