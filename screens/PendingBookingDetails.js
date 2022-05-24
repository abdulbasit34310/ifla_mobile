import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  Image,
  ScrollView, FlatList, Alert
} from 'react-native';

const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';

export default function PendingBookingDetails({navigation, route}){
    const [bookingData, setBookingData]= React.useState(route.params);
    
    const deleteData = () => {
      var requestOptions = {
        method: 'DELETE',
      };
  
      fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log('Delete Response:', result))
        .catch((error) => console.log('error', error));
    };
  
  
  
    return(
      
        <View style={{backgroundColor: '#E0EFF6', height: "100%"}}>
          <ScrollView>
            <Text style={{fontSize: 40, marginTop:20, alignSelf: "center", backgroundColor: "#005761", color: "white", borderRadius: 15, padding: 10}}>{bookingData.Payment.Amount} Rs</Text>
                <Text style={{fontSize: 16, alignSelf: "center", color: "#005761", borderRadius: 15, padding: 10,fontWeight: "bold" }}>{bookingData.datetime}</Text>
                
                <View style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Source </Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{bookingData.pickaddress.City}, {bookingData.pickaddress.Building} {bookingData.pickaddress.Street}</Text>
                
                <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 10, marginLeft: 10, marginHorizontal:10}}>Desitination </Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{bookingData.dropaddress.City}, {bookingData.dropaddress.Building} {bookingData.dropaddress.Street}</Text>
                </View>
                <View style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Description </Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{bookingData.bookdetails.Description}</Text>
              </View>
              <View style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Shipment </Text>
              <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >Quantity: {bookingData.bookdetails.Quantity}</Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >Insurance: {bookingData.bookdetails.isInsured? "Yes":"No"}</Text>
                {/* <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >VehicleNo</Text> */}
              </View>
              <Icon
          name="truck"
          type="font-awesome"
          size={40}
          color='#068E94'
          style={{margin: 10, fontSize: 30}}
        />

              </View>
              </View>
                <View  style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24,flexDirection: "row", alignItems: 'center', justifyContent:'space-between'}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Shipment Type </Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{bookingData.bookdetails.Type}</Text>
              </View>
              <View  style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24, flexDirection: "row", alignItems: 'center', justifyContent:'space-between'}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Status </Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{bookingData.Status}</Text>
              </View>
              <View  style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24,flexDirection: "row", alignItems: 'center',justifyContent:'space-between'}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Weight </Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{bookingData.bookdetails.Weight} kg</Text>
              </View>
                <TouchableOpacity onPress={()=>{Alert.alert(
              'Cancel Booking',
              "Are you sure?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Confirm", onPress: () => {deleteData(); navigation.goBack();}}
              ]
            )}} style={{marginTop:20 , padding:10 ,marginBottom: 20 ,backgroundColor: "#068E94", width: 200 ,alignSelf:'center',borderRadius: 5}}><Text style={{alignSelf: 'center', color: "white", fontWeight: "bold", fontSize: 18}}>Cancel Booking</Text></TouchableOpacity>
         
         </ScrollView>

          </View>
    
    )
  }
  