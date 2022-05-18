import * as React from 'react';
import { View, StyleSheet, Image, } from 'react-native';
import Constants from 'expo-constants';
import IFLA from './images/IFLA.png';

const MainScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={{
                    backgroundColor: "#00ABB2",
                    width: 335,
                    height: 275,
                }}
                source={IFLA}
            />
        </View>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#00ABB2',
        alignItems: 'center',
    },
});