import * as React from 'react';
import { Animated, View, Text, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';

import { FontAwesome5, Octicons } from 'react-native-vector-icons';
import IFLAlogo from '../assets/IFLA.png';

function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                    source={IFLAlogo}
                    style={styles.IFLAlogo}
                    animation='slideInRight'
                />
            </View>

            <Animatable.View style={styles.footer}
                animation="fadeInUp"
            >
                <Text style={styles.title}>Getting Started ! </Text>
                <TouchableOpacity style={styles.to} onPress={() => { navigation.navigate("Login") }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Octicons name="sign-in" size={18} color={'white'} />
                        <Text style={styles.buttonText}>Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.to} onPress={() => { navigation.navigate("SignUp") }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome5 name="file-signature" size={18} color={'white'} />
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
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
        color: "#AAAAAA",
        fontSize: 14,
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
        elevation: 5,
    },
    IFLAlogo: {
        width: 250,
        height: 200,
    },


});

// const moveAnim = useRef(new Animated.Value(0)).current;
// const fadeAnim = useRef(new Animated.Value(0)).current;

// useEffect(() => {
//   Animated.sequence([
//     Animated.timing(moveAnim, {
//       duration: 2000,
//       toValue: Dimensions.get('window').width / 1.6,
//       delay: 0,
//       useNativeDriver: false,
//     }),
//     Animated.timing(moveAnim, {
//       duration: 2000,
//       toValue: 0,
//       delay: 0,
//       useNativeDriver: false,
//     }),
//   ]).start();
//   Animated.timing(fadeAnim, {
//     duration: 2000,
//     toValue: 1,
//     delay: 2000,
//     useNativeDriver: false,
//   }).start();
// }, [moveAnim, fadeAnim]);

// return (
//   <SafeAreaView style={styles.container}>
//     <View style={styles.contentContainer}>
//       <Animated.Image
//         style={[styles.image, { opacity: fadeAnim }]}
//         source={require('./assets/images/logo.png')}
//       />
//       <Animated.View style={[styles.logoContainer, { marginLeft: moveAnim }]}>
//         <Text style={[styles.logoText]}>I</Text>
//         <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
//           FLA
//         </Animated.Text>
//       </Animated.View>
//     </View>
//   </SafeAreaView>
// );