import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  Image,
  ScrollView, FlatList, Alert
} from 'react-native';
import ScheduleBooking from './ScheduleBooking';

const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';

export default function QuoteDetails({navigation, route}){
    const id= route.params;
    const [quoteData, setQuoteData]= React.useState({});
    const{ PickupCity,  DropoffCity, Vehicle, Price, Weight }=quoteData;
    
    const getQuoteData = async () => {
      const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`);
      const data = await response.json();
      setQuoteData(data);

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
      getQuoteData();
    }, [setQuoteData]);
  
    return(
      
        <View style={{backgroundColor: '#E0EFF6', height: "100%"}}>
<ScrollView>
                <Text style={{fontSize: 40, marginVertical:20, alignSelf: "center", backgroundColor: "#005761", color: "white", borderRadius: 15, padding: 10}}>10000 Rs</Text>
                
                <View style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Source </Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{PickupCity}</Text>
                
                <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 10, marginLeft: 10, marginHorizontal:10}}>Desitination </Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{DropoffCity}</Text>
                </View>
                <View  style={{backgroundColor: 'white', padding: 10, margin: 2,  marginHorizontal:10,flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Vehicle Type </Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >FTL</Text>
              </View>
              <View  style={{backgroundColor: 'white', padding: 10, margin: 2 , marginHorizontal:10,flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Weight </Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{Weight} kg</Text>
              </View>
              <View  style={{backgroundColor: 'white', padding: 10, margin: 2 , marginHorizontal:10,flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Shipment Type</Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >FTL</Text>
              </View>
                <TouchableOpacity onPress={()=>{Alert.alert(
              'Delete Quote',
              "Are you sure?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Confirm", onPress: () => {deleteData(); navigation.goBack();}}
              ]
            )}} style={{marginTop:20 , padding:10 ,marginBottom: 20 ,backgroundColor: "#068E94", width: 200 ,alignSelf:'center',borderRadius: 5}}><Text style={{alignSelf: 'center', color: "white", fontWeight: "bold", fontSize: 18}}>Delete</Text></TouchableOpacity>
         
         <TouchableOpacity onPress={()=>{Alert.alert(
              'Create Booking',
              "Are you sure?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Confirm", onPress: () => {navigation.navigate("ScheduleBooking");}}
              ]
            )}} style={{marginTop:20 , padding:10 ,marginBottom: 20 ,backgroundColor: "#068E94", width: 200 ,alignSelf:'center',borderRadius: 5}}><Text style={{alignSelf: 'center', color: "white", fontWeight: "bold", fontSize: 18}}>Create Booking</Text></TouchableOpacity>
         
         </ScrollView>
          </View>
    
    )
  }
  