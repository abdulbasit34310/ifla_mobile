import * as React from 'react';
import { View, StyleSheet, Image, } from 'react-native';
import Constants from 'expo-constants';
import logo from './images/Falas.png';

const MainScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={logo}
                style={styles.logo}
            />
        </View>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#009387',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});