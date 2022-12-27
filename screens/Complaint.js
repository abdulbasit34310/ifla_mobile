import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Card, Divider, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid, Platform } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";
import axios from 'axios';
import { REST_API_LOCAL } from "@env";

function Complaint({ route,navigation }) {
    const id = route.params
    const [complain,setComplain] = useState("")

    const sendComplaint = async ()=>{
        let result = await SecureStore.getItemAsync("userToken")
        var response = await axios.patch(
            `${REST_API_LOCAL}/customerMobile/saveComplain`,
            { complain:complain, shipperId:id }, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${result}` },
          }
          );
        console.log(response.data)
        
        if (Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
                "Rating and Feedback Given",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>

            <View style={{ paddingBottom: 15 }}>
                <TouchableRipple style={{ width: '15%', borderRadius: 14, padding: 7, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', }} onPress={() => {
                    navigation.goBack();
                }}>
                    <Entypo name='chevron-small-left' size={34} />
                </TouchableRipple>
            </View>

            <View style={styles.card}>
                <FontAwesome name='wrench' size={40} color={'#31302C'} />
                <Text style={{ fontSize: 42, color: '#31302C', fontWeight: "bold", marginVertical: 15 }}>Report {'\n'} an issue
                </Text>
                <Text style={{ fontSize: 16, color: 'grey', marginBottom: 15 }}> Sorry to hear that you have a problem. {'\n'} Our technician is here to help you.</Text>

                <TextInput
                    style={styles.ti}
                    placeholder="Write your Complaint..."
                    placeholderTextColor="#666666"
                    onChangeText={(text) => setComplain(text)}
                >
                </TextInput>

                <View>
                    <TouchableOpacity style={styles.to} onPress={sendComplaint}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 35,
        backgroundColor: "#00ABB2",
    },
    card: {
        backgroundColor: "#E0EFF6",
        height: '90%',
        borderRadius: 14,
        padding: 20,
    },
    ti: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        borderRadius: 5,
        height: '45%',
        padding: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold", marginHorizontal: 5, color: 'white'
    },
    to: {
        backgroundColor: '#068E94',
        marginTop: 25,
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        elevation: 5,
    },
})

export default Complaint