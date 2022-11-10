import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { TouchableRipple } from "react-native-paper";
import * as Animatable from 'react-native-animatable';

import IFLAlogo from "../../assets/IFLA.png";

const BookingScreen = ({ navigation, route }) => {
  const shipperData = route.params;

  return (
    <View style={styles.container}>

      <View style={styles.topSection}>
        <View style={{ paddingTop: 5, }}>
          <TouchableRipple style={{ width: '12%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
            navigation.goBack();
          }}>
            <Entypo name='chevron-small-left' size={34} />
          </TouchableRipple>
        </View>

        <Animatable.Image
          animation="lightSpeedIn"
          style={styles.IFLAlogo}
          source={IFLAlogo}
        />
      </View>

      <Animatable.View style={styles.bottomSection} animation="fadeInUp">

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
            onPress={() => {
              navigation.navigate("PendingBookings");
            }}
          >
            <Text style={styles.cardText}>Pending Bookings</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.card, { width: '100%' }]}
          onPress={() => navigation.navigate("TopTabNavigatorStack", shipperData)}
        >
          <Text style={styles.cardText}>My Bookings</Text>
        </TouchableOpacity>


      </Animatable.View>

    </View >
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  IFLAlogo: {
    alignSelf: "center",
    width: 200,
    height: 175,
  },
  bottomSection: {
    flex: 1,
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
