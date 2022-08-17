// Don't proceed to next screen without filling the necessary data, disable the next button

import * as React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Alert, Modal, ToastAndroid
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';
const API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';
import {REST_API,REST_API_LOCAL} from "@env"
import * as SecureStore from 'expo-secure-store';

const REST_API_ENDPOINT = 'http://192.168.43.10:3000/shipper' || REST_API+"/shipper";

function ShipmentType({ navigation, nextStep, bookingData, setBooking }) {
  const [type, setType] = React.useState(1);

  return (
    <View style={{ backgroundColor: "#00ABB2", height: "100%", padding: 20, justifyContent: "center" }}>
      <View style={{ padding: 20, backgroundColor: "#E0EFF6", borderRadius: 10, elevation: 24 }}>
        <Text style={{ marginBottom: 15 }}>Choose Shipment Type</ Text>
        <ButtonGroup
          buttons={[
            'Full Truck Load',
            'Less than Truck Load',
          ]}
          selectedIndex={type}
          onPress={(value) => {
            setType(value);
            if (value === 0) {
              setBooking({ ...bookingData, Type: 'FTL' })
            }
            else {
              setBooking({ ...bookingData, Type: 'LTL' })
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
            backgroundColor: '#068E94',
          }}
        />
        <TouchableOpacity onPress={nextStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
      </View>
    </View>
  )
}
// Truck Details Step 2

function AddressDetails({ navigation, nextStep, prevStep, bookingData, setBooking }) {
  const [getText, setText] = React.useState();
  const [isPickup, setIsPickup] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [pickUpCity, setPickUpCity] = React.useState("");
  const [dropOffCity, setDropOffCity] = React.useState("");
  const [citiesData, setCitiesData] = React.useState();

  const getCitiesData = async () => {
    const response = await fetch(`${API_ENDPOINT}/cities.json`);
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
    // console.log(getCitiesData);
    var result = getText.filter((city) => {
      if (city.includes(text)) {
        return city;
      }
    });
    // console.log(result);
    setCitiesData(result);

  };
  const setPickup = (item) => {
    setPickUpCity(item);
    setBooking({ ...bookingData, PickupCity: item })
    setModalVisible(!modalVisible);
  }

  const setDropOff = (item) => {
    setDropOffCity(item);
    setBooking({ ...bookingData, DropoffCity: item })
    setModalVisible(!modalVisible);
  }
  return (
    <View style={{ backgroundColor: '#00ABB2', height: "100%", padding: 20, justifyContent: "center" }}>
      <View style={{ padding: 20, backgroundColor: "#E0EFF6", borderRadius: 10, elevation: 24 }} >
        <Text>AddressDetails</Text>
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
                      isPickup ? setPickup(item) : setDropOff(item);

                    }}>
                    <Text style={{ fontWeight: 'bold' }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Text style={{ padding: 10 }}>Pickup City: </Text>
        <TouchableOpacity style={[styles.textInput, { padding: 5 }]} onPress={() => { setIsPickup(true); setModalVisible(true); }}><Text>{pickUpCity === "" ? "Select City" : pickUpCity}</Text></TouchableOpacity>

        <Text style={{ padding: 10 }}>Pickup Address: </Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.textInput, { height: 70 }]}
          onChangeText={(v) => { setBooking({ ...bookingData, PickUpAddress: v }); }}
        />
        <Text style={{ padding: 10 }}>Dropoff City: </Text>
        <TouchableOpacity style={[styles.textInput, { padding: 5 }]} onPress={() => { setIsPickup(false); setModalVisible(true); }}><Text>{dropOffCity === "" ? "Select City" : dropOffCity}</Text></TouchableOpacity>
        <Text style={{ padding: 10 }}>Dropoff Address: </Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.textInput, { height: 70 }]}
          onChangeText={(v) => { setBooking({ ...bookingData, DropoffAddress: v }); }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 15 }}>
          <TouchableOpacity onPress={prevStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Previous</Text></TouchableOpacity>
          <TouchableOpacity onPress={nextStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

// Goods Details Step 3
function GoodsDetails({ navigation, bookingData, nextStep, prevStep, setBooking }) {
  const [selectedValue, setSelectedValue] = React.useState('');

  return (
      <View style={{ padding: 20,backgroundColor: "#00ABB2", height: "100%",justifyContent:"center" }}>
        <View style={{ padding: 20, backgroundColor: "#E0EFF6", borderRadius: 10, elevation: 24 }}>
          <Text>GoodsDetails</Text>
          <Text style={{ padding: 10 }}>Select Goods Type: </Text>
          <Picker
            selectedValue={selectedValue}
            style={[styles.textInput, { fontSize: 12 }]}
            onValueChange={(itemValue, itemIndex) => { setSelectedValue(itemValue); setBooking({ ...bookingData, GoodsType: itemValue }); }}>
            <Picker.Item label="Please Specify" value="" />
            <Picker.Item label="Raw Materials" value="Raw Naterials" />
            <Picker.Item label="Electronics" value="Electronics" />
            <Picker.Item label="Agriculture" value="Agriculture" />
            <Picker.Item label="Clothing" value="Clothing" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Furniture" value="Furniture" />
          </Picker>

          <Text style={{ padding: 10 }}>Approx. Weight (kgs): </Text>
          <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(v) => { setBooking({ ...bookingData, Weight: v }); }} />
          <Text style={{ padding: 10 }}>Quantity: </Text>
          <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(v) => { setBooking({ ...bookingData, Quantity: v }); }} />
          <Text style={{ padding: 10 }}>Dimensions (cm): </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ padding: 10 }}>Height: </Text>
            <TextInput
              keyboardType='numeric'
              style={{
                borderColor: '#005761',
                borderWidth: 1,
                padding: 3,
                marginLeft: 10,
                width: '20%',
                borderRadius: 4,
              }}
              onChangeText={(v) => { setBooking({ ...bookingData, Height: v }); }}
            />
            <Text style={{ padding: 10 }}>Width: </Text>
            <TextInput
              keyboardType='numeric'
              style={{
                borderColor: '#005761',
                borderWidth: 1,
                padding: 3,
                marginLeft: 10,
                width: '20%',
                borderRadius: 4,
              }}
              onChangeText={(v) => { setBooking({ ...bookingData, Width: v }); }}
            />
          </View>
          <Text style={{ padding: 10 }}>Length: </Text>
          <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(v) => { setBooking({ ...bookingData, Length: v }); }} />
          <Text style={{ padding: 10 }}>Goods Description: </Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={[styles.textInput, { height: 70 }]}
            onChangeText={(v) => { setBooking({ ...bookingData, Description: v }); }} />

          <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 15 }}>
            <TouchableOpacity onPress={prevStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Previous</Text></TouchableOpacity>
            <TouchableOpacity onPress={nextStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
          </View>
        </View>
      </View>
  )
}


// Truck Details Step 4
function TruckDetails({ navigation, nextStep, prevStep, setDate, date, setBooking, bookingData, postData }) {
  const [selectedValue, setSelectedValue] = React.useState('');
  const [checked, setChecked] = React.useState(false);


  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Your Booking is Confirmed",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <View style={{ backgroundColor: "#00ABB2", height: "100%", padding: 20, justifyContent: "center" }}>
      <View style={{ padding: 20, backgroundColor: "#E0EFF6", borderRadius: 10, elevation: 24 }}>
        {/* <Text>TruckDetails</Text> */}
        {/* <Text style={{ padding: 10 }}>Select Vehicle Type: </Text>
        <Picker
          selectedValue={selectedValue}
          style={[styles.textInput, { fontSize: 12 }]}
          onValueChange={(itemValue, itemIndex) => { setSelectedValue(itemValue); setBooking({ ...bookingData, GoodsType: itemValue }); }}>
          <Picker.Item label="Please Specify" value="" />
          <Picker.Item label="Truck" value="Truck" />
          <Picker.Item label="Shehzore" value="Shehzore" />
          <Picker.Item label="Mazda" value="Mazda" />
          <Picker.Item label="Suzuki" value="Suzuki" />
        </Picker> */}
        
     <Text style={{padding: 10}}>Choose Date:</Text>
      <TouchableOpacity style={[styles.textInput, {padding: 5}]} onPress={showDatepicker}><Text>{date.toDateString()}</Text></TouchableOpacity>
      <Text style={{padding: 10}}>Choose Time:</Text>
        <TouchableOpacity style={[styles.textInput, {padding: 5}]} onPress={showTimepicker} ><Text>{date.toTimeString()}</Text></TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={{flexDirection:"row",alignItems:"center", marginTop:10 }}>   
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                            />
                        <Text  style={{ fontSize: 16 }}>Do you want to pack your items?</Text>   
                        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 15 }}>
          <TouchableOpacity onPress={prevStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Previous</Text></TouchableOpacity>
          {checked?<TouchableOpacity onPress={nextStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>:<TouchableOpacity style={styles.buttonStyle} onPress={() => {
            Alert.alert(
              'Confirm Order',
              "Are you sure?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Confirm", onPress: () => {  postData(false);showToastWithGravity(); } }
              ]
            )
          }}><Text style={styles.buttonText}>Proceed</Text></TouchableOpacity>}
          
        </View>
      </View>
    </View>
  )
}

function PackageDetails({ navigation, nextStep, prevStep, setBooking, bookingData, postData }) {
  const [selectedValue, setSelectedValue] = React.useState('');
  const [type, setType] = React.useState('');
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Your Booking is Confirmed",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <View style={{ backgroundColor: "#00ABB2", height: "100%", padding: 20, justifyContent: "center" }}>
      <View style={{ padding: 20, backgroundColor: "#E0EFF6", borderRadius: 10, elevation: 24 }}>
        <Text>Package Details</Text>
        <Text style={{ padding: 10 }}>Name: </Text>
        <Picker
          selectedValue={selectedValue}
          style={[styles.textInput, { fontSize: 12 }]}
          onValueChange={(itemValue, itemIndex) => { setSelectedValue(itemValue); setBooking({ ...bookingData, PackageName: itemValue }); }}>
          <Picker.Item label="Please Specify" value="" />
          <Picker.Item label="Normal" value="Normal" />
          <Picker.Item label="Premium" value="Premium" />
          <Picker.Item label="Extra Special" value="Extra Special" />
        </Picker>

        <Text style={{ padding: 10 }}>Choose Type:</Text>
        <Picker
          selectedValue={type}
          style={[styles.textInput, { fontSize: 12 }]}
          onValueChange={(itemValue, itemIndex) => { setType(itemValue); setBooking({ ...bookingData, PackageType: itemValue }); }}>
          <Picker.Item label="Please Specify" value="" />
          <Picker.Item label="Box" value="Box" />
          <Picker.Item label="Pallets" value="Pallets" />
          <Picker.Item label="Wooden" value="Wooden" />
          <Picker.Item label="Bagged" value="Bagged" />
        </Picker>
        
        <Text style={{ padding: 10 }}>Weight (kgs): </Text>
          <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(v) => { setBooking({ ...bookingData, PackageWeight: v }); }} />
          <Text style={{ padding: 10 }}>Dimensions (cm): </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ padding: 10 }}>Height: </Text>
            <TextInput
              keyboardType='numeric'
              style={{
                borderColor: '#005761',
                borderWidth: 1,
                padding: 3,
                marginLeft: 10,
                width: '20%',
                borderRadius: 4,
              }}
              onChangeText={(v) => { setBooking({ ...bookingData, PackageHeight: v }); }}
            />
            <Text style={{ padding: 10 }}>Width: </Text>
            <TextInput
              keyboardType='numeric'
              style={{
                borderColor: '#005761',
                borderWidth: 1,
                padding: 3,
                marginLeft: 10,
                width: '20%',
                borderRadius: 4,
              }}
              onChangeText={(v) => { setBooking({ ...bookingData, PackageWidth: v }); }}
            />
          </View>
          <Text style={{ padding: 10 }}>Package Length (kgs): </Text>
          <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(v) => { setBooking({ ...bookingData, PackageLength: v }); }} />
          
        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 15 }}>
          <TouchableOpacity onPress={prevStep} style={styles.buttonStyle}><Text style={styles.buttonText}>Previous</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => {
            Alert.alert(
              'Confirm Order',
              "Are you sure?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Confirm", onPress: () => { postData(true); showToastWithGravity();} }
              ]
            )
          }}><Text style={styles.buttonText}>Proceed</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const Success = ({navigation, nextStep, prevStep, setBooking, bookingData }) => {
  return (
    <div>Booking Done Succsfully</div>
  )
}





export default function ScheduleBooking({route, navigation }) {
  const [step, setStep] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  //const [token,setToken] = React.useState(route.params.token)
    // async function getValueFor(key) {
    //     let result = await SecureStore.getItemAsync(key);
    //     if (result) {
    //         setToken(result)
    //     } else {
    //         navigation.navigate("RegisteringScreen")
    //     }
    //   }

    // React.useEffect(()=>{
    //     navigation.addListener('focus', () => {
    //         getValueFor('token')
    //       });
    // },[navigation])

  const CUSTOMER = "-MsgaaNM6XCecZ6niCZd";

  const [bookingData, setBooking] = React.useState({
    Type: "LTL", step1: step, PickupCity: '', PickUpAddress: '', DropoffCity: '', DropoffAddress: '',
    GoodsType: '', Description: '', Weight: '',Height:'',Length:'',Width:'', Date: date.toDateString(), Time: date.toTimeString(), Status: 'Pending', Customer: CUSTOMER
  });

  const clear = () => {
    setBooking({
      Type: '', PickupCity: '', PickUpAddress: '', DropoffCity: '', DropoffAddress: '',
      Vehicle: '', Description: '', Weight: '', Offer: '', Date: date.toDateString(), Time: date.toTimeString(), Status: 'Pending'
    });
  }

  const postData = async (Packaging) => {
    // const token = getValueFor('userToken')
    let token1 = await SecureStore.getItemAsync("userToken")
    const body = bookingData
    body.package = Packaging
    const headers = {"Authorization" : `Bearer ${token1}`}
    try {
      let res = await axios.post(`${REST_API_ENDPOINT}/saveBookingMobile`,body, { withCredentials: true, headers: headers })
      console.log(res.data)
      
    } catch (error) {
      console.log(error.response.data)
    }

    // let token1 = await SecureStore.getItemAsync("userToken")
    // .then(val=>setToken(val));
    console.log(token1)
    // var obj = {  
    //     method: 'POST',
    //     body: JSON.stringify(body),
    //     withCredentials: true,
    //     credentials: 'include',
    //     headers: {
    //         'Authorization': `Bearer ${token1}`
    //     }
    //   }
    // const response = 
    // fetch(`${REST_API_ENDPOINT}/saveBookingMobile`, obj).then(response => console.log(response.json())).catch(err => console.log(err))
    // const token = getValueFor('userToken')
    // const headers = { "Authorization": `Bearer ${token}` }
    // const response = await axios.get(`${REST_API_ENDPOINT}/getPendingBookings`, { headers: headers });
    // const data = await response.data.bookings;
    // let data = await response.json()
    // console.log(data)
    
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result
    } else {
      return "Token not in SecureStore"
    }
  }

  const prevStep = () => {
    const { step1 } = bookingData;
    setBooking({ ...bookingData, step1: step1 - 1 });
  }

  const nextStep = () => {
    const { step1 } = bookingData;
    setBooking({ ...bookingData, step1: step1 + 1 });
  }

  const { step1 } = bookingData;

  switch (step1) {
    case 0:
      return (
        <ShipmentType
          nextStep={nextStep}
          bookingData={bookingData}
          setBooking={setBooking}
        />
      )
    case 1:
      return (
        <AddressDetails
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          setBooking={setBooking}

        />
      )
    case 2:
      return (
        <GoodsDetails
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          setBooking={setBooking}

        />

      )
    case 3:
      return (

        <TruckDetails
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          setBooking={setBooking}
          date={date}
          setDate={setDate}
          postData={postData}
        />
      )
    case 4:
      return (
        <PackageDetails
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          setBooking={setBooking}
          postData={postData}

        />
      )
      case 5:
      return (
        <Success
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          setBooking={setBooking}

        />
      )
    default:
    //do nothing

  }

}


const styles = StyleSheet.create({
  textInput: {
    borderColor: '#005761',
    borderWidth: 1,
    padding: 3,
    marginLeft: 10,
    width: '90%',
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
    borderColor: '#005761',
    borderWidth: 1,
    marginBottom: 1,
    borderRadius: 10,

  },
});