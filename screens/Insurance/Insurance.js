import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, Pressable, View } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { TouchableRipple } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { TouchableOpacity } from 'react-native-gesture-handler';

const REST_API_LOCAL = "http://192.168.100.143:4000";

const Insurance = ({ navigation, route }) => {

    var isInsurance = false;


    const [subscribed, setSubscribed] = React.useState();

    const addInsurance = async (x, y) => {

        const body =
        {
            plan: x,
            price: y,
        }

        let token = await SecureStore.getItemAsync("userToken");
        const headers = { Authorization: `Bearer ${token}` };

        let response = await axios.patch(
            `${REST_API_LOCAL}/shipper/insurance`,
            body,
            { withCredentials: true, headers: headers }
        );
        console.log("Response.Data");
        console.log(response.data);

        if (Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
                "Insurance Added",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.topSection}>
                <View style={{ paddingTop: 5, }}>
                    <TouchableRipple style={{ width: '12%', height: '80%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
                        navigation.goBack();
                    }}>
                        <Entypo name='chevron-small-left' size={34} />
                    </TouchableRipple>
                </View>

            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity
                    onPress={() => { addInsurance("1 Year Plan", 20000) }}
                    style={[styles.card, isInsurance ? { backgroundColor: 'red' } : { backgroundColor: 'white' }]}>
                    <Text style={styles.cardText}>1 Year Plan</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { addInsurance("6 Month Plan", 12000) }}
                    style={styles.card}>
                    <Text style={styles.cardText}>6 Month Plan</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E0EFF6",
    },
    topSection: {
        flex: 2,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    bottomSection: {
        padding: 20,
        justifyContent: 'center',
        alignContent: 'center'
    },
    card: {
        elevation: 5,
        height: '40%',
        width: "100%",
        marginBottom: 20,
        padding: 10,
        borderRadius: 14,
        justifyContent: 'center',
    },
    cardText: {
        fontSize: 17,
        color: "#005761",
        fontWeight: "bold",
    },
});

export default Insurance;
