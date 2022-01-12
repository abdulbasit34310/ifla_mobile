import * as React from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';
import Constants from 'expo-constants';
import logo from './images/Falas.png';

const EditProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={logo}
                style={styles.logo}
            />
            <Text>Edit Profile Screen</Text>
        </View>
    )
}

export default EditProfileScreen;

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