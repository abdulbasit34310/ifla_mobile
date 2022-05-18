import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// import { set } from 'react-native-reanimated';

import AB from './images/AB.png';

const FIREBASE_API_ENDPOINT =
    'https://madproject-61e88-default-rtdb.firebaseio.com/';


const EditProfileScreen = ({ navigation, route }) => {
    var key = route.params.key;

    var name = route.params.name;
    var email = route.params.emailId;
    var address = route.params.address;
    var phoneNo = route.params.phoneNo;

    const [getInfo, setInfo] = React.useState({ key: '', name: '', email: '', address: '', phoneNo: '' });

    const [data, setData] = React.useState({
        name: '',
        email: '',
        address: '',
        phoneNo: '',
        checkNameChange: false,
        checkEmailChange: false,
        checkAddressChange: false,
        checkPhoneNoChange: false,
        notValidName: true,
        notValidEmail: true,
        notValidAddress: true,
        notValidPhoneNo: true,
    });

    const updateData = () => {
        const id = key;

        const objToSave = {
            name: getInfo.name,
            email: getInfo.email,
            address: getInfo.address,
            phoneNo: getInfo.phoneNo,
        }

        var requestOptions = {
            method: 'PATCH',
            body: JSON.stringify(objToSave),
        };

        fetch(`${FIREBASE_API_ENDPOINT}/userCredentials/${id}.json`, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));

        navigation.goBack()
    };

    React.useEffect(() => {
        var obj = {
            key: key,
            name: name,
            email: email,
            address: address,
            phoneNo: phoneNo,
        }
        setInfo(obj)
    }, [])

    const nameChange = (val) => {
        if (val.trim().length >= 2) {
            setData({
                ...data,
                name: val,
                checkNameChange: true,
                notValidName: true,
            });
            setInfo({
                ...getInfo,
                name: val,
            });
        } else {
            setData({
                ...data,
                name: val,
                checkNameChange: false,
                notValidName: false,
            });
            setInfo({
                ...getInfo,
                name: val,
            });
        }
    };
    const emailChange = (val) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(String(val).toLowerCase())) {
            setData({
                ...data,
                email: val,
                checkEmailChange: true,
                notValidEmail: true,
            });
            setInfo({
                ...getInfo,
                email: val,
            })
        } else {
            setData({
                ...data,
                email: val,
                checkEmailChange: false,
                notValidEmail: false,
            });
            setInfo({
                ...getInfo,
                email: val,
            })
        }
    };
    const addressChange = (text) => {
        if (text.trim().length > 1) {
            setData({
                ...data,
                address: text,
                checkAddressChange: true,
                notValidAddress: true,
            });
            setInfo({
                ...getInfo,
                address: text,
            })
        } else {
            setData({
                ...data,
                address: text,
                checkAddressChange: false,
                notValidAddress: false,
            })
            setInfo({
                ...getInfo,
                address: text,
            })
        }
    }
    const phoneNoChange = (val) => {
        const reg = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        if (reg.test(String(val))) {
            setData({
                ...data,
                phoneNo: val,
                checkPhoneNoChange: true,
                notValidPhoneNo: true,
            });
            setInfo({
                ...data,
                phoneNo: val,
            })
        } else {
            setData({
                ...data,
                phoneNo: val,
                checkPhoneNoChange: false,
                notValidPhoneNo: false,
            })
            setInfo({
                ...data,
                phoneNo: val,
            })
        }
    }



    return (
        <View style={styles.container}>
            <Image
                style={{
                    backgroundColor: "#00ABB2",
                    width: 100,
                    height: 100,
                    borderRadius: 90,
                }}
                source={AB}
            />

            {/* Name */}

            <View style={styles.action}>
                <FontAwesome name="user-o" color="#00ABB2" size={20} />
                <TextInput
                    style={styles.ti}
                    value={getInfo.name}
                    placeholderTextColor="#666666"
                    onChangeText={nameChange}
                ></TextInput>
                {data.checkNameChange ? (
                    <Feather name="check-circle" color="green" size={20} />
                ) : null}
            </View>
            {data.notValidName ? null : (
                <View duration={500}>
                    <Text style={styles.errorMessage}>Name must be 2 characters long.</Text>
                </View>
            )}

            {/* Email */}

            <View style={styles.action}>
                <FontAwesome name="envelope-o" color="#00ABB2" size={20} />
                <TextInput
                    style={styles.ti}
                    value={getInfo.email}
                    placeholderTextColor="#666666"
                    keyboardType="email-address"
                    autoCorrect={false}
                    onChangeText={emailChange}
                />
            </View>
            {data.notValidEmail ? null : (
                <View duration={500}>
                    <Text style={styles.errorMessage}>Email Syntax must be write.</Text>
                </View>
            )}

            {/* Address */}

            <View style={styles.action}>
                <Icon name="map-marker-radius" color="#00ABB2" size={20} />
                <TextInput
                    placeholderTextColor="#666666"
                    value={getInfo.address}
                    autoCorrect={false}
                    style={styles.ti}
                    onChangeText={(text) => addressChange(text)}
                />
            </View>
            {data.notValidAddress ? null : (
                <View duration={500}>
                    <Text style={styles.errorMessage}>
                        Enter some Address.
                    </Text>
                </View>
            )}
            {/* Phone Number */}

            <View style={styles.action}>
                <Feather name="phone" color="#00ABB2" size={20} />
                <TextInput
                    value={getInfo.phoneNo}
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    style={styles.ti}
                    onChangeText={(text) => phoneNoChange(text)}
                />
            </View>
            {data.notValidPhoneNo ? null : (
                <View duration={500}>
                    <Text style={styles.errorMessage}>
                        Phone Number is not Valid.
                    </Text>
                </View>
            )}
            <TouchableOpacity style={styles.submitButton} onPress={updateData}>
                <Text style={{ fontSize: 13, color: 'white', }}>Submit</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.submitButton} onPress={() => { navigation.navigate("ProfileScreen") }}>
                <Text style={{ fontSize: 13, color: 'white', }}>Profile</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        padding: 25,
        backgroundColor: '#E0EFF6',

    },
    ti: {
        flex: 1,
        paddingLeft: 13,
        color: '#666666',
        fontSize: 13,
    },
    submitButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#00ABB2',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    action: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
    },
    errorMessage: {
        color: '#FF0000',
        fontSize: 12,
    },
});