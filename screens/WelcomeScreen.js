import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import Constants from 'expo-constants';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>

            <View style={styles.footer}>

                <Text style={styles.title}>Getting Started </Text>
                <TouchableOpacity style={styles.to} onPress={() => { navigation.navigate("SignInScreen") }}>
                    <Text style={styles.signInText}>Sign In</Text>
                    <MaterialIcons name="navigate-next" color="#fff" size={20} />
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
        paddingTop: Constants.statusBarHeight, backgroundColor: '#066145',
    },
    header: {
        flex: 2, justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: 'grey',
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
        color: 'white',
        fontSize: 18,
    },
    to: {
        backgroundColor: '#066145',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        height: 35,
        flexDirection: 'row',
    },
});