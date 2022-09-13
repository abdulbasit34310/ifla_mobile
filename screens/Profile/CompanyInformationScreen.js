import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { Avatar, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { set } from 'react-native-reanimated';

const FIREBASE_API_ENDPOINT =
    'https://madproject-61e88-default-rtdb.firebaseio.com/';


const CompanyInformationScreen = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Title style={styles.tit}> Company Information:</Title>

            <Text style={styles.heading}>
                Name of Company:
            </Text>
            <Text style={styles.ans}>
                Shehroz Fabrics
            </Text>

            <Text style={styles.heading}>
                Address:
            </Text>
            <Text style={styles.ans}>
                PIA Colony
            </Text>

            <Text style={styles.heading}>
                Email:
            </Text>
            <Text style={styles.ans}>
                sherhoz@gmail.com
            </Text>

            <Text style={styles.heading}>
                Mobile Number:
            </Text>
            <Text style={styles.ans}>
                78687868678
            </Text>

            <Text style={styles.heading}>
                Country:
            </Text>
            <Text style={styles.ans}>
                Anglastan
            </Text>

            <Text style={styles.heading}>
                NTN number:
            </Text>
            <Text style={styles.ans}>
                pata nhi
            </Text>
        </View>
    )
}

export default CompanyInformationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#E0EFF6',
        alignItems: 'flex-start',
        paddingLeft: 15,
    },
    tit: {
        marginBottom: 20,
    },
    heading: {
        color: 'grey',
        marginTop: 15,
        paddingLeft: 10,
    },
    ans: {
        color: 'black',
        margin: 10
    }
});