import * as React from 'react';
import { SafeAreaView, View, StyleSheet, Image, } from 'react-native';
import { Title, Text, } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../components/context';
import EditProfileScreen from './EditProfileScreen';
import AB from './images/AB.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { set } from 'react-native-reanimated';

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
        <SafeAreaView style={styles.background}>

            <View style={{ paddingBottom: 25 }}>
                <View style={{ alignItems: 'center', margin: 10 }}>
                    <Image
                        style={{ width: 150, height: 150, borderRadius: 100, }}
                        source={AB}
                    />
                    <SafeAreaView>
                        <Title style={{ fontWeight: 'bold', marginTop: 25, fontSize: 25, }}>
                            {getData.name}
                        </Title>
                    </SafeAreaView>
                </View>
            </View>

            <View style={styles.userInfoSection}>

                {/* Email */}

                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{getData.email}</Text>
                </View>

                {/* Address */}

                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{getData.address}</Text>
                </View>

                {/* Phone Number */}

                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{getData.phoneNo}</Text>
                </View>
            </View>

            <View>
                <TouchableOpacity style={styles.infoBox} onPress={() => { navigation.navigate("EditProfileScreen", { key: getData.keyId, name: getData.name, emailId: getData.email, address: getData.address, phoneNo: getData.phoneNo }) }}>
                    <Text style={[styles.title, { fontSize: 13, color: '#E0EFF6', padding: 10, }]}>
                        Edit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoBox} onPress={() => { navigation.navigate("CompanyInformationScreen") }}>
                    <Text style={[styles.title, { fontSize: 13, color: '#E0EFF6', padding: 10, }]}>
                        Company Information
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={signOut}>
                    <Title style={{ color: '#005761' }}>
                        Logout
                    </Title>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#E0EFF6',
        padding: 25
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    infoBox: {
        borderRadius: 10,
        backgroundColor: '#00ABB2',
        margin: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 5, width: 5 }, // IOS
        shadowOpacity: 44, // IOS
        shadowRadius: 5, //IOS
        elevation: 24,

        alignItems: 'center'
    },
});