import * as React from 'react';
import { View, Text, StyleSheet, AppRegistry, Image } from 'react-native';

const TrackingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Tracking</Text>
        </View>
    );
};

export default TrackingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#009387',
        alignContent: 'center',
    },

});
