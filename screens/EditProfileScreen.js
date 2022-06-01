import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Title, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AB from './images/AB.png';
import * as SecureStore from 'expo-secure-store';

const REST_API_ENDPOINT = "http://192.168.8.101:3000/users"

const EditProfileScreen = ({ navigation, route }) => {
    var item = route.params.item 
    var key = item.key;

    var name = item.PersonId.name;
    var username = item.PersonId.username;
    var email = item.PersonId.email;
    if(item.Addresses[0])
        var address = item.Addresses[0].City;
    else
        var address = ""
    var phoneNo = item.PersonId.phone;

    const [getInfo, setInfo] = React.useState({ key: key, name: name, email: email, address: address, phoneNo: phoneNo, username: username});

    const [hasGalleyPermission, setHasGalleryPermission] = React.useState(null);
    const [image, setImage] = React.useState(`http://192.168.8.101:3000/images/${item.PersonId.image}`);

    const [data, setData] = React.useState({
        name: '',
        email: '',
        username:'',
        address: '',
        phoneNo: '',
        checkNameChange: false,
        checkUserNameChange: false,
        checkEmailChange: false,
        checkAddressChange: false,
        checkPhoneNoChange: false,
        notValidName: true,
        notValidUserName: true,
        notValidEmail: true,
        notValidAddress: true,
        notValidPhoneNo: true,
    });

    const updateData = async () => {
        // const id = key;

        const objToSave = {
            name: getInfo.name,
            username:getInfo.username,
            email: getInfo.email,
            Addresses: {Building:getInfo.address ,City:getInfo.address, Street:getInfo.address},
            phone: getInfo.phoneNo,
        }
        let formData = new FormData();
  
        //Adding files to the formdata
        formData.append("image", {name:"r76fhtt.jpg",uri:image, type:"image/jpg"});
        let token1 = await SecureStore.getItemAsync("userToken")

        // var requestOptions = {
        //     method: 'PATCH',
        //     body: JSON.stringify(objToSave),
        // };
        // const res1 = await
        const [res1, res2] = await Promise.all([
            axios.patch(`${REST_API_ENDPOINT}/update`, objToSave, {withCredentials:true, headers: {"Authorization": `Bearer ${token1}`}}),
            axios.post(`${REST_API_ENDPOINT}/uploadImage`,formData, {withCredentials:true, headers: {
                'Content-Type':'multipart/form-data',
                'Accept':'application/json',
                "Authorization": `Bearer ${token1}`
              }})
        ])
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
        });
        console.log(res1.data)
        console.log(res2.data)
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

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

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
    const usernameChange = (val) => {
        if (val.trim().length >= 2) {
            setData({
                ...data,
                username: val,
                checkUserNameChange: true,
                notValidUserName: true,
            });
            setInfo({
                ...getInfo,
                username: val,
            });
        } else {
            setData({
                ...data,
                username: val,
                checkUserNameChange: false,
                notValidUserName: false,
            });
            setInfo({
                ...getInfo,
                username: val,
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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    return (<View style={styles.container}>
        <View style={{ paddingTop: 20, alignItems: 'center', }}>
            <TouchableOpacity onPress={() => pickImage()} >
                <View style={{
                    width: 125,
                    height: 125,
                }} >
                    <ImageBackground source={{ uri: image }}
                        style={{ height: 125, width: 125 }}
                        imageStyle={{ borderRadius: 90 }}
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}><Icon
                                name="camera-outline"
                                size={35}
                                color="#fff"
                                style={{
                                    opacity: 0.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    borderRadius: 10,
                                }}
                            /></View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        </View>

        <View style={styles.userInfoSection}>

            {/* Full Name */}

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Icon name="account" color="#666666" size={20} />
                <Title style={styles.titleStyle}>Full Name</Title>
            </View>
            <TextInput
                style={styles.textInputStyle}
                value={getInfo.name}
                onChangeText={nameChange}
            ></TextInput>

            {/* Email */}

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Icon name="email" color="#666666" size={20} />
                <Title style={styles.titleStyle}>Email</Title>
            </View>
            <TextInput
                style={styles.textInputStyle}
                value={getInfo.email}
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCorrect={false}
                onChangeText={emailChange}
            />

            {/* Username */}

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Icon name="account-circle" color="#666666" size={20} />
                <Title style={styles.titleStyle}>Username</Title>
            </View>
            <TextInput
                style={styles.textInputStyle}
                value={getInfo.username}
                placeholderTextColor="#666666"
                autoCorrect={false}
                onChangeText={usernameChange}

            />

            {/* Address */}
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Icon name="map-marker-radius" color="#666666" size={20} />
                <Title style={styles.titleStyle}>Address</Title>
            </View>
            <TextInput
                placeholderTextColor="#666666"
                value={getInfo.address}
                autoCorrect={false}
                style={styles.textInputStyle}
                onChangeText={addressChange}
            />

            {/* Phone Number */}

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Icon name="cellphone" color="#666666" size={20} />
                <Title style={styles.titleStyle}>Phone Number</Title>
            </View>

            <TextInput
                value={getInfo.phoneNo}
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                autoCorrect={false}
                style={styles.textInputStyle}
                onChangeText={phoneNoChange}
            />

        </View>

        <TouchableOpacity style={styles.submitButton} onPress={updateData}>
            <Text style={{ fontSize: 18, color: "white" }}>Submit</Text>
        </TouchableOpacity>
    </View >

    )
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#E0EFF6',
    },
    userInfoSection: {
        marginTop: 10, justifyContent: 'center'
    },
    titleStyle: {
        color: '#666666',
        fontSize: 15,
        marginLeft: 4
    },
    textInputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#AAAAAA",
        fontSize: 20,
        paddingBottom: 10,

    },
    submitButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#00ABB2',
        color:"white",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        width: '100%',
        height: 60,
        elevation: 9,
    },
    action: {
        flexDirection: 'row',
        marginBottom: 15,
    },
});