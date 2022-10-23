import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Animated, ActivityIndicator, Alert, Button, Dimensions, FlatList, Image, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import RadioButton from './RadioButton';

function Ratings() {
    const [defaultRating, setDefaultRating] = React.useState(0);
    const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5]);

    const starImageFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const starImageCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => { setDefaultRating(item) }}
                            >
                                <Image
                                    style={styles.starImgStyle}
                                    source={
                                        item <= defaultRating ? { uri: starImageFilled } :
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

    const [option, setOption] = useState(null);

    const data = [
        { value: 'Overall Service' },
        { value: 'Customer Support' },
        { value: 'Speed and Efficiency' },
        { value: 'Pickup and Delivery Service' },
        { value: 'Transperancy' },
    ];

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.card}>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#AAAAAA"
                    }}

                >
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
                ></TextInput>

                <View>
                    <TouchableOpacity style={styles.to}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}
export default Ratings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 35,
        backgroundColor: "#00ABB2",
    },
    card: {
        backgroundColor: "#E0EFF6",
        height: '100%',
        borderRadius: 14,
        padding: 15,
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
        elevation: 3,
    },
    ti: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        borderRadius: 5,
        height: '30%',
        padding: 10,
    },
})