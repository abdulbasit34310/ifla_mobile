import React from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Picker,TouchableOpacity, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, Pressable, View } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { TouchableRipple } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from 'expo-status-bar';
import axios from "axios";

import {REST_API_LOCAL} from '@env'

const Insurance = ({ navigation, route }) => {

    var item = route.params.item
    if (item.insurance) {
        var isInsurance = true;
    }
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

        if (Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
                "Insurance Subscribed",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        navigation.navigate("Payments", { screen: "PaymentMethod", params: { isInsurance: true, amount: parseInt(y) } });
    }

    return (
        <View style={styles.container}>
        <StatusBar style="dark" />

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
                <Text style={styles.paragraph}>During transit, customers' goods are exposed to a lot of risks like natural calamity, weather conditions and accidents so it is advisable for customers to buy an insurance plan although it is not necessary.</Text>
                <View style={[styles.card, { backgroundColor: 'white' }]}>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.cardText, { color: '#005761', fontSize: 26 }]}>
                        1 Year Plan
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (item.insurance.plan == "1 Year Plan") {
                                Alert.alert("You have already subscribed to 1 Year Insurance Plan.");
                            }
                            else if (item.insurance.plan == "6 Months Plan") {
                                Alert.alert("You have already subscribed to 6 Months Insurance Plan.");
                            }
                            else
                                addInsurance("1 Year Plan", 20000)
                        }}
                        style={[styles.button, item.insurance.plan == "1 Year Plan" ? { backgroundColor: '#005761' } : { backgroundColor: '#00ABB2' }]} >
                        <Text style={[styles.cardText, isInsurance ? { color: 'white' } : { color: '#005761' }]}>20,000 PKR </Text>
                    </TouchableOpacity>
                </View>
            </View>


                <View style={[styles.card, { backgroundColor: 'white' }]}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.cardText, { color: '#005761', fontSize: 26 }]}>
                            6 Months Plan
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (item.insurance.plan == "1 Year Plan") {
                                    Alert.alert("You have already subscribed to 1 Year Insurance Plan.");
                                }
                                else if (item.insurance.plan == "6 Months Plan") {
                                    Alert.alert("You have already subscribed to 6 Months Insurance Plan.");
                                }
                                else
                                    addInsurance("6 Months Plan", 12000)
                            }}
                            style={[styles.button, item.insurance.plan == "6 Months Plan" ? { backgroundColor: '#005761' } : { backgroundColor: '#00ABB2' }]} >
                            <Text style={[styles.cardText, isInsurance ? { color: 'white' } : { color: '#005761' }]}>12,000 PKR </Text>
                        </TouchableOpacity>
                    </View>
                </View>

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
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    bottomSection: {
        flex: 7,
        padding: 20,
        alignContent: 'center'
    },
    card: {
        elevation: 5,
        height: '15%',
        width: "100%",
        padding: 15,
        borderRadius: 14,
        marginBottom: 20
    },
    cardText: {
        fontSize: 17,
        fontWeight: "bold",
    },
    button: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 14,

    }, paragraph: {
        color: 'grey',
        marginBottom: 20,
    }
});

export default Insurance;