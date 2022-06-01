import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  Image,
  ScrollView, FlatList, Alert
} from 'react-native';
import axios from 'axios';
import {REST_API,REST_API_LOCAL} from "@env"
import * as SecureStore from 'expo-secure-store';


const REST_API_ENDPOINT = 'http://192.168.8.101:3000/shipper' || REST_API+"/shipper";

export default function QuoteDetails({navigation, route}){
    // const id= route.params;
    const [quoteData, setQuoteData]= React.useState(route.params.item);
    // const{ PickupCity,  DropoffCity, Price, Weight }=quoteData;
    
    // const getQuoteData = async () => {
    //   const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`);
    //   const data = await response.json();
    //   setQuoteData(data);

    // };
    const deleteData = async () => {
      // var requestOptions = {
      //   method: 'DELETE',
      // };
  
      // fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`, requestOptions)
      //   .then((response) => response.json())
      //   .then((result) => console.log('Delete Response:', result))
      //   .catch((error) => console.log('error', error));
      let token1 = await SecureStore.getItemAsync("userToken")
      const headers = { "Authorization": `Bearer ${token1}` }

      const id = quoteData._id
      let response = await axios.delete(`${REST_API_ENDPOINT}/deleteQuote/${id}`, {withCredentials: true,headers:headers})
      console.log(response.data)
      console.log("Quote Deleted")

    };
  
  
    // React.useEffect(() => {
    //   getQuoteData();
    // }, [setQuoteData]);
  
    return(
      
        <View style={{backgroundColor: '#E0EFF6', height: "100%"}}>
<ScrollView>
                <Text style={{fontSize: 40, marginVertical:20, alignSelf: "center", backgroundColor: "#005761", color: "white", borderRadius: 15, padding: 10}}>{quoteData.Payment.Amount} Rs</Text>
                
                <View style={{backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal:10, borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Source </Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{quoteData.pickaddress.City}</Text>
                
                <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 10, marginLeft: 10, marginHorizontal:10}}>Destination </Text>
                <Text style={{fontSize: 20, marginLeft: 50, marginTop: 5}} >{quoteData.dropaddress.City}</Text>
                </View>
                <View  style={{backgroundColor: 'white', padding: 10, margin: 2,  marginHorizontal:10,flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Quantity </Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{quoteData.bookdetails.Quantity}</Text>
              </View>
              <View  style={{backgroundColor: 'white', padding: 10, margin: 2 , marginHorizontal:10,flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Weight </Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{quoteData.bookdetails.Weight} kg</Text>
              </View>
              <View  style={{backgroundColor: 'white', padding: 10, margin: 2 , marginHorizontal:10,flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', borderRadius:10, elevation: 24}}>
                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10}}>Shipment Type</Text>
                <Text style={{fontSize: 16, marginRight: 20, backgroundColor: '#068E94', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5}} >{quoteData.bookdetails.Type}</Text>
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
  