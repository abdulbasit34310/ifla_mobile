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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import logo from './images/Falas.png';

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
                    <Text style={styles.signInText}>Sign In</Text>
                    {/* <MaterialIcons name="navigate-next" color="#fff" size={27} /> */}
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
        fontSize: 30,
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
        color: "#E0EFF6",
        fontSize: 26,
    
    },
    to: {
        backgroundColor: '#00ABB2',
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: 175,
        height: 75,
        flexDirection: 'row',
        marginTop: 35,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});