import * as React from 'react';
import {
    Text, View, StyleSheet, ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal, FlatList, ToastAndroid
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { ButtonGroup } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';



export default function GetAQuote({ navigation }) {

    const [category, setCategory] = React.useState(0);
    const [packaging, setPackaging] = React.useState(false);
    const [isPickup, setIsPickup] = React.useState(true);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [getText, setText] = React.useState();
    const [pickUpCity, setPickUpCity] = React.useState("");
    const [dropOffCity, setDropOffCity] = React.useState("");
    const [citiesData, setCitiesData] = React.useState();
    const [vehicleType, setVehicleType] = React.useState("");
    const [checked, setChecked] = React.useState(false);


    const [quoteData, setQuote] = React.useState({
        Category: '', PickupCity: pickUpCity, DropoffCity: dropOffCity, 
        Weight: '', Packaging:packaging, vehicleType:vehicleType
    });


    const SaveQuote = async () => {

        setQuote({ ...quoteData, DropoffCity: dropOffCity })
        setQuote({ ...quoteData, PickupCity: pickUpCity })


        console.log(quoteData)
        var obj = quoteData;
        var item = await AsyncStorage.getItem('@store:savedQuotes');
        item = JSON.parse(item);
        item = [...item, obj]
        console.log('Saving');
        await AsyncStorage.setItem(
            '@store:savedQuotes',
            JSON.stringify(item)
        );
        console.log('Saving Done!');

    };

    const LoadData = async () => {
        console.log('Loading');
        var item = await AsyncStorage.getItem('@store:savedQuotes');
        var parsed = JSON.parse(item)
        console.log(parsed);
        console.log('Loading Done!');
    };

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            "Quote Saved",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };


    const getCitiesData = async () => {
        const response = await fetch(`${FIREBASE_API_ENDPOINT}/cities.json`);
        const data = await response.json();
        var arr;
        var arr2 = [];
        for (let key in data) {
            arr = data[key]
        }
        arr.forEach(element => {
            arr2.push(element.city);
        });

        setCitiesData(arr2);
        setText(arr2);
    };

    React.useEffect(() => {
        getCitiesData();
    }, [setCitiesData], [setText]);



    const filter = (text) => {
        console.log(getCitiesData);
        var result = getText.filter((city) => {
            if (city.includes(text)) {
                return city;
            }
        });
        console.log(result);
        setCitiesData(result);

    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => { navigation.push("ViewQuotes") }}
                    style={{ backgroundColor: "white", padding: 10, marginLeft: 10, borderRadius: 10 }}
                ><Text>View Quotes</Text></TouchableOpacity>
            )
        });
    });



    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder="Enter City Name"
                            style={{ padding: 5, width: '80%' }}
                            onChangeText={(v) => {
                                filter(v);
                            }}
                        />
                        <FlatList style={{ width: "100%" }}
                            refreshing={false}
                            onRefresh={getCitiesData}
                            keyExtractor={(item, index) => index}
                            data={citiesData}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={styles.countryLabel}
                                    onPress={() => {
                                        isPickup ? setPickUpCity(item) : setDropOffCity(item);
                                        setModalVisible(!modalVisible)

                                    }}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

                <View style={{padding: 20,  justifyContent:"center",backgroundColor: "#00ABB2", height: "100%"}}>
                    <View style={{ padding: 20, backgroundColor: "#E0EFF6", borderRadius: 10, elevation: 24 }}>
                        <ButtonGroup
                            buttons={[
                                'Less than Truckload',
                                'Full Truckload',
                            ]}
                            selectedIndex={category}
                            onPress={(value) => {
                                setCategory(value);
                                if (value === 0) {
                                    setQuote({ ...quoteData, Category: 'LTL' })
                                }
                                else {
                                    setQuote({ ...quoteData, Category: 'FTL' })
                                }
                            }}
                            containerStyle={{
                                backgroundColor: 'white',
                                height: 100,
                                width: '90%',
                                borderRadius: 10,

                            }}
                            buttonStyle={{ padding: 10, color: 'black' }}
                            selectedButtonStyle={{
                                backgroundColor: '#00ABB2',
                            }}
                        />

                        <Text style={{ padding: 10 }}>Select Vehicle Type: </Text>
                            <Picker
                            selectedValue={vehicleType}
                            style={[styles.textInput, { fontSize: 12 }]}
                            onValueChange={(itemValue, itemIndex) => { setVehicleType(itemValue); setQuote({ ...quoteData, vehicleType: itemValue }); }}>
                            <Picker.Item label="Please Specify" value="" />
                            <Picker.Item label="Truck" value="Truck" />
                            <Picker.Item label="Shehzore" value="Shehzore" />
                            <Picker.Item label="Mazda" value="Mazda" />
                            <Picker.Item label="Suzuki" value="Suzuki" />
                            </Picker>
                        <Text style={{ padding: 10 }}>Weight (kg): </Text>
                        <TextInput
                            keyboardType='numeric'
                            style={styles.textInput}
                            onChangeText={(v) => { setQuote({ ...quoteData, Weight: v }); }} />
                        <Text style={{ padding: 10 }}>Quantity: </Text>
                        <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(v) => { setQuote({ ...quoteData, Quantity: v }); }} />
                        <Text style={{ padding: 10 }}>Pickup City: </Text>
                        <TouchableOpacity style={[styles.textInput, { padding: 5 }]} onPress={() => { setIsPickup(true); setModalVisible(true); }}><Text>{pickUpCity === "" ? "Select City" : pickUpCity}</Text></TouchableOpacity>


                        <Text style={{ padding: 10 }}>Dropoff City: </Text>
                        <TouchableOpacity style={[styles.textInput, { padding: 5 }]} onPress={() => { setIsPickup(false); setModalVisible(true); }}><Text>{dropOffCity === "" ? "Select City" : dropOffCity}</Text></TouchableOpacity>

                         <View style={{flexDirection:"row",alignItems:"center", marginTop:10 }}>   
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                            />
                        <Text  style={{ fontSize: 16 }}>Do you want to pack your items?</Text>   
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#068E94',
                                padding: 10,
                                width: 100,
                                borderRadius: 10,
                                alignSelf: 'center',
                                marginTop: 20,
                            }}
                            onPress={() => { SaveQuote(); showToastWithGravity(); }}

                        >
                            <Text style={{ alignSelf: 'center', color: 'white' }}>Save Quote</Text>
                        </TouchableOpacity>
                    </View>
                </View>

        </View>
    );
}
const styles = StyleSheet.create({
    textInput: {
        borderColor: '#068E94',
        borderWidth: 1,
        padding: 3,
        marginLeft: 10,
        width: '90%',
        borderRadius: 4,
    },
    textInput2: {
        borderColor: '#068E94',
        borderWidth: 1,
        padding: 3,
        marginLeft: 10,
        width: '20%',
        borderRadius: 4,
    },
    buttonStyle: {
        backgroundColor: '#068E94',
        padding: 10,
        width: 100,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        alignSelf: 'center', color: 'white'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    checkBoxContainer: {
        borderWidth: 0,
        padding: 0,
        backgroundColor: 'white',
    },
    centeredView: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        width: "100%",
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    countryLabel: {
        width: "100%",
        padding: 10,
        borderColor: '#068E94',
        borderWidth: 1,
        marginBottom: 1,
        borderRadius: 10,

    },
});
