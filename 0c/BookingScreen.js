import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { Card } from "react-native-paper";
import * as Animatable from 'react-native-animatable';

import IFLAlogo from "../../assets/IFLA.png";

const BookingScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>

      <View style={styles.topSection}>
        <Animatable.Image
          animation="lightSpeedIn"
          style={styles.IFLAlogo}
          source={IFLAlogo}
        />
      </View>

      <Animatable.View animation="fadeInUp"
        style={styles.bottomSection} >

        <View style={styles.cardRow}>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("ScheduleBooking");
            }}
          >
            <Text style={styles.cardText}>Schedule a Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("GetAQuote")}
          >
            <Text style={styles.cardText}>Generate a Quote</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("PendingBookings");
            }}
          >
            <Text style={styles.cardText}>Pending Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("MyBookings")}
          >
            <Text style={styles.cardText}>My Bookings</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("BookingsHistory");
            }}
          >
            <Text style={styles.cardText}>Bookings History</Text>
          </TouchableOpacity>

        </View>
      </Animatable.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#068E94",
  },
  topSection: {
    flex: 2,
    backgroundColor: "#068E94",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 20,
  },
  IFLAlogo: {
    alignSelf: "center",
    width: 200,
    height: 175,
  },
  bottomSection: {
    flex: 3,
    backgroundColor: "#E0EFF6",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 5,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    elevation: 5,
    height: 100,
    width: "47%",
    marginBottom: 20,
    padding: 10,
    borderRadius: 14,
    backgroundColor: "white",
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 17,
    alignSelf: "center",
    color: "#005761",
    fontWeight: "bold",
  },
});

export default BookingScreen;
