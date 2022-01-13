import * as React from 'react';
import { SafeAreaView, View, StyleSheet, Image, } from 'react-native';
import { Avatar, Title, Text, Button, } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../components/context';
import EditProfileScreen from './EditProfileScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';

const FIREBASE_API_ENDPOINT =
    'https://madproject-61e88-default-rtdb.firebaseio.com/';

const ProfileScreen = ({ navigation }) => {

    var email = ""
    const { signOut } = React.useContext(AuthContext);
    const [getData, setData] = React.useState({ key: ' ', name: 'John Doe', email: 'johndoe@gmail.com', address: 'Wherever', phoneNo: '03987654321' });

    const getSignedInUserCredentials = async () => {
        const response = await fetch(
            `${FIREBASE_API_ENDPOINT}/userCredentials.json`
        );
        const data = await response.json();

        var keyValues = Object.keys(data);

        let credential = {};

        for (let i = 0; i < keyValues.length; i++) {
            let key = keyValues[i];
            if (data[key].email == email) {
                credential = {
                    keyId: key,
                    name: data[key].name,
                    email: data[key].email,
                    address: data[key].address,
                    phoneNo: data[key].phoneNo
                };
                setData(credential)
                break;
            }
        }
    };

    React.useEffect(() => {
        const getSignedInEmail = async () => {
            var item = await AsyncStorage.getItem('userToken');
            email = item
        }


        getSignedInEmail();
        getSignedInUserCredentials();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{getData.name}</Title>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{getData.address}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{getData.phoneNo}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{getData.email}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>

                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <TouchableOpacity onPress={() => { navigation.navigate("EditProfileScreen", { key: getData.keyId, name: getData.name, emailId: getData.email, address: getData.address, phoneNo: getData.phoneNo }) }}><Title>Edit</Title></TouchableOpacity>
                </View>
                <View style={styles.infoBox}>
                    <TouchableOpacity onPress={signOut}><Title>Logout</Title></TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});