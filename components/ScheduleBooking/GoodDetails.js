import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Modal, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Picker } from "@react-native-picker/picker";

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

export default function GoodsDetails({
  navigation,
  bookingData,
  nextStep,
  prevStep,
  setBooking,
}) {
  const [selectedValue, setSelectedValue] = React.useState("");
  console.log(bookingData);

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
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.card}>

          <Text style={styles.header}>Goods Details</Text>
          <Text style={styles.buttonInsideText}>Select Goods Type: </Text>
          <Picker
            selectedValue={bookingData.goodsType}
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
            <Picker.Item label="Petroleum" value="Petroleum" />

          </Picker>

          <Text style={styles.buttonInsideText}>Approx. Weight (kgs): </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(v) => {
              setBooking({ ...bookingData, weight: v });
            }}
            value={bookingData.weight.toString()}
          />
          <Text style={styles.buttonInsideText}>Quantity: </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(v) => {
              setBooking({ ...bookingData, quantity: v });
            }}
            value={bookingData.quantity.toString()}
          />
          <Text style={styles.buttonInsideText}>Dimensions (cm): </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.buttonInsideText}>Height: </Text>
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
              value={bookingData.height}
              onChangeText={(v) => {
                setBooking({ ...bookingData, height: v });
              }}
            />
            <Text style={[styles.buttonInsideText, { paddingLeft: 5 }]}>
              Width:{" "}
            </Text>
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
              value={bookingData.width}
              onChangeText={(v) => {
                setBooking({ ...bookingData, width: v });
              }}
            />
          </View>
          <Text style={styles.buttonInsideText}>Length: </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={bookingData.length}
            onChangeText={(v) => {
              setBooking({ ...bookingData, length: v });
            }}
          />
          <Text style={styles.buttonInsideText}>Goods Description: </Text>
          <TextInput
            multiline
            value={bookingData.description}
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
                if (
                  bookingData.description &&
                  bookingData.goodsType &&
                  bookingData.height &&
                  bookingData.length &&
                  bookingData.width &&
                  bookingData.quantity &&
                  bookingData.weight
                ) {
                  nextStep();
                } else {
                  console.log(bookingData);
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
    </ScrollView>
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
    padding: 5,
    marginLeft: 10,
    width: "95%",
    borderRadius: 4,
  },

  buttonStyle: {
    backgroundColor: Theme.PrimaryForeground,
    padding: 10,
    width: 100,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: Theme.PrimaryText,
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
