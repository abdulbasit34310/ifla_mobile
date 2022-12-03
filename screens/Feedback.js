import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Card, Divider, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, ActivityIndicator, Alert, Button, Dimensions, FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, View, ToastAndroid, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

import * as SecureStore from "expo-secure-store";
import moment from "moment";
import axios from "axios";

import RadioButton from './RadioButton';

const REST_API_LOCAL = "http://192.168.100.143:4000";

function Ratings({ route, navigation }) {

    const id = route.params;

    const [getFeedback, setFeedback] = React.useState();

    const [getRatings, setRatings] = React.useState(0);
    const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);

    const starImageFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const starImageCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';


    const saveRatingAndFeedback = async () => {
        if (getFeedback || getRatings) {

            console.log("Ratings " + getRatings);
            console.log("Feedback " + getFeedback);

            const body = {
                ratings: getRatings,
                feedback: getFeedback,
                suggestion: option,
                shipperId: id,
            }

            let token = await SecureStore.getItemAsync("userToken");
            const headers = { Authorization: `Bearer ${token}` };

            let response = await axios.patch(
                `${REST_API_LOCAL}/customerMobile/saveReviewAndFeedback`,
                body,
                { withCredentials: true, headers: headers }
            );
            console.log("Response.Data");
            console.log(response.data);
            if (Platform.OS == 'android') {
                ToastAndroid.showWithGravity(
                    "Rating and Feedback Given",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
            navigation.goBack();
        } else {
            if (Platform.OS == 'android') {
                ToastAndroid.showWithGravity(
                    "Atleast give rating or feedback.",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
        }
    }

    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => { setRatings(item) }}
                            >
                                <Image
                                    style={styles.starImgStyle}
                                    source={
                                        item <= getRatings ? { uri: starImageFilled } :
                                            { uri: starImageCorner }
                                    }
                                ></Image>
                            </TouchableOpacity>
                        )
                    }
                    )
                }
            </View>
        )
    }

    const [option, setOption] = useState();

    const data = [
        { value: 'Overall Service' },
        { value: 'Customer Support' },
        { value: 'Speed and Efficiency' },
        { value: 'Pickup and Delivery Service' },
        { value: 'Transperancy' },
    ];

    return (
        <KeyboardAvoidingView style={styles.container}>

            <View style={{ paddingBottom: 15 }}>
                <TouchableRipple style={{ width: '12%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
                    navigation.goBack();
                }}>
                    <Entypo name='chevron-small-left' size={34} />
                </TouchableRipple>
            </View>

            <View style={styles.card}>
                <View
                    style={{ borderBottomWidth: 1, borderBottomColor: "#AAAAAA", paddingTop: 10 }}>
                    <Text style={{ fontSize: 27 }}>Rate Your Experience</Text>
                    <Text style={{ fontSize: 12, color: 'grey', marginTop: 10, }} >Are you satisfied with the service?</Text>
                    <CustomRatingBar />
                </View>

                <SafeAreaView>
                    <Text style={{ fontSize: 12, fontWeight: "bold", }}>Tell us what can be improved?</Text>
                    <RadioButton data={data} onSelect={(value) => setOption(value)} />
                </SafeAreaView>


                <TextInput
                    style={styles.ti}
                    placeholder="Tell us on how can we improve..."
                    placeholderTextColor="#666666"
                    onChangeText={(text) => setFeedback(text)}
                ></TextInput>

                <View>
                    <TouchableOpacity style={styles.to}
                        onPress={saveRatingAndFeedback}
                    >
                        <Text style={styles.buttonText}>Submit </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Ratings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#E0EFF6",
    },
    card: {
        backgroundColor: "white",
        height: '90%',
        borderRadius: 14,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    customRatingBarStyle: {
        marginVertical: 15,
        flexDirection: 'row',
    },
    starImgStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
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
    ti: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        borderRadius: 5,
        height: '30%',
        padding: 10,
    },
})