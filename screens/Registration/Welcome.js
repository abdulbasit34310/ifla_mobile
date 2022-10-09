import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import Constants from 'expo-constants';

import { MaterialIcons, FontAwesome, Octicons } from 'react-native-vector-icons';
import IFLAlogo from '../../assets/IFLA.png';

function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}><Image
                source={IFLAlogo}
                style={styles.IFLAlogo}
            /></View>

            <View style={styles.footer}>

                <Text style={styles.title}>Getting Started ! </Text>
                <TouchableOpacity style={styles.to} onPress={() => { navigation.navigate("Login") }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Octicons name="sign-in" size={18} color={'white'} />
                        <Text style={styles.buttonText}>Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.to} onPress={() => { navigation.navigate("SignUp") }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Octicons name="sign-out" size={18} color={'white'} />
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default Welcome;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#068E94',
    },
    header: {
        flex: 2, justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#E0EFF6',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 25,
        paddingHorizontal: 30,
    },
    IFLAlogo: {
        width: height_logo,
        height: height_logo,
    },
    title: {
        color: "#068E94",
        fontSize: 22,
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
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
    IFLAlogo: {
        width: 250,
        height: 200,
    },
});