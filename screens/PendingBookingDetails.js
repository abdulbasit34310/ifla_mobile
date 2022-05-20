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
    const id= route.params;
    const [bookingData, setBookingData]= React.useState({});
    const{PickUpAddress, DropoffAddress, PickupCity,  DropoffCity, Description,Vehicle, Offer, Weight, Status,Date, Time }=bookingData;
    
    const getBookingsData = async () => {
      const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`);
      const data = await response.json();
      setBookingData(data);

    };
    const deleteData = () => {
      var requestOptions = {
        method: 'DELETE',
      };
  
      fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log('Delete Response:', result))
        .catch((error) => console.log('error', error));
    };
  
  
    React.useEffect(() => {
      getBookingsData();
    }, [setBookingData]);
  
    return(
      
        <View style={{backgroundColor: '#E0EFF6', height: "100%"}}>
<ScrollView>
            
                <Text style={{fontSize: 16, alignSelf: "center", color: "#005761", borderRadius: 15, padding: 10,fontWeight: "bold" }}>{Date}, {Time}</Text>
                
                <View style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Source </Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{PickupCity}, {PickUpAddress}</Text>
                
                <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 10, marginLeft: 10, marginHorizontal:10}}>Desitination </Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{DropoffCity}, {DropoffAddress}</Text>
                </View>
                <View style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Description </Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{Description}</Text>
              </View>
                <View  style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24,flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Vehicle Type </Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >FTL</Text>
              </View>
              <View  style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Status </Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{Status}</Text>
              </View>
              <View  style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24,flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Weight </Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{Weight} kg</Text>
              </View>
              <View  style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24,flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Goods Type</Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >Raw Materials</Text>
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
  