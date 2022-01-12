import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { Avatar, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const EditProfileScreen = ({ route }) => {
    const key = route.params;
    const [data, setData] = React.useState({
        name: '',
        email: '',
        checkNameChange: false,
        checkEmailChange: false,
        notValidName: true,
        notValidEmail: true,
    });
    const nameChange = (val) => {
        if (val.trim().length != 2) {
            setData({
                ...data,
                name: val,
                checkNameChange: true,
                notValidName: true,
            });
        } else {
            setData({
                ...data,
                name: val,
                checkNameChange: false,
                notValidName: false,
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
        } else {
            setData({
                ...data,
                email: val,
                checkEmailChange: false,
                notValidEmail: false,
            });
        }
    };

    return (
        <View style={styles.container}>
            <Avatar.Image
                source={{
                    uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                }}
                size={150}
            />
            <View style={styles.action}>
                <FontAwesome name="user-o" color="#009387" size={30} />
                <TextInput
                    style={styles.ti}
                    value="Your Name"
                    placeholderTextColor="#666666"
                    onChangeText={(val) => nameChange(val)}></TextInput>
                {data.checkNameChange ? (
                    <Feather name="check-circle" color="green" size={30} />
                ) : null}
            </View>
            {data.notValidName ? null : (
                <View duration={500}>
                    <Text style={styles.errorMsg}>Name must be 2 characters long.</Text>
                </View>
            )}

            <View style={styles.action}>
                <Feather name="phone" color="#009387" size={30} />
                <TextInput
                    value="Phone"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    style={styles.ti}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome name="envelope-o" color="#009387" size={30} />
                <TextInput
                    value="Email"
                    placeholderTextColor="#666666"
                    keyboardType="email-address"
                    autoCorrect={false}
                    style={styles.ti}
                />
            </View>
            <View style={styles.action}>
                <Icon name="map-marker-radius" color="#009387" size={30} />
                <TextInput
                    placeholderTextColor="#666666"
                    value={'Islamabad, Pakistan'}
                    autoCorrect={false}
                    style={styles.ti}
                />
            </View>
            <TouchableOpacity style={styles.commandButton} onPress={() => { }}>
                <Text style={styles.panelButtonTitle}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, alignContent: 'center',
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        padding: 30,
    },
    ti: {
        flex: 1,
        paddingLeft: 11,
        color: '#666666',
        fontSize: 17,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#009387',
        alignItems: 'center',
        marginTop: 10,
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
});