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
import logo from './images/IFLA.png';

function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}><Image
                source={logo}
                style={styles.logo}
            /></View>

            <View style={styles.footer}>

                <Text style={styles.title}>Getting Started ! </Text>
                <TouchableOpacity style={styles.to} onPress={() => { navigation.navigate("SignInScreen") }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Octicons name="sign-in" size={18} color={'white'}/>
                        <Text style={styles.signInText}>Sign In</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.to} onPress={() => { navigation.navigate("SignUpScreen") }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Octicons name="sign-out" size={18} color={'white'} />
                        <Text style={styles.signInText}>Register</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default WelcomeScreen;

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
    logo: {
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
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    signInText: {
        color: "white",
        fontSize: 18,
        marginHorizontal: 5,
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
    logo: {
        width: 250,
        height: 200,
    },
});