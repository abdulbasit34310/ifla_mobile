import * as React from 'react';
import {Text, View, StyleSheet,
  TouchableOpacity,

  ScrollView, FlatList, Alert
} from 'react-native';

import { Divider } from 'react-native-paper';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {REST_API,REST_API_LOCAL} from "@env"
import * as SecureStore from 'expo-secure-store';


const REST_API_ENDPOINT = 'http://192.168.43.10:3000/shipper' || REST_API+"/shipper";

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
      
      <ScrollView>
      <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: "bold", marginLeft: 20, color: "#005761"}} >{quoteData.bookdetails.Type=="FTL"? "Full Truck Load": "Less Than Truck Load"}</Text>
      <Text style={{fontSize: 16, fontWeight: "bold", marginLeft: 20, color: "black" }}>{quoteData.datetime}</Text>
      <View style={{elevation:8, backgroundColor:"white", margin:15, padding:25, borderRadius: 10}}> 
        <View style={{flexDirection:"row" , justifyContent: "space-between", marginVertical:5}}>
          <Text style={{fontSize: 16}} ><FontAwesome name="location-arrow" color="#005761" size={20} /> Source
          </Text>
          <Text style={{fontSize: 16}} ><FontAwesome name="map-marker" color="#005761" size={20} /> Destination</Text>
          </View>
  
          <View style={{flexDirection:"row" , justifyContent: "space-between"}}>
            
        <Text style={styles.addressContainer}>{quoteData.pickaddress.City}</Text>
        <Text style={styles.addressContainer}>
          {quoteData.dropaddress.City}</Text>
        </View>
        <Divider/>
        <View style={{marginVertical: 25}}>
          <View style={styles.propertyContainerStyle}>
            <Text >Weight</Text>
            <Text style={styles.propertyStyle}>{quoteData.bookdetails.Weight} kg</Text>
          </View>
  
          
          <View style={styles.propertyContainerStyle}>
            <Text>Quantity</Text>
            <Text style={styles.propertyStyle}>{quoteData.bookdetails.Quantity} Pcs</Text>
          </View>
          <View style={styles.propertyContainerStyle}>
            <Text >Insurance</Text>
            <Text style={styles.propertyStyle}>No</Text>
          </View>
  
          <View style={styles.propertyContainerStyle}>
            <Text>Packaging</Text>
            <Text style={styles.propertyStyle}>No</Text>
          </View>
        </View>
        <Divider/>
        <View style={{marginVertical:20}}>
        <View style={styles.propertyContainerStyle}>
            <Text>Sub Total</Text>
            <Text style={styles.propertyStyle}>{quoteData.Payment.Amount} Rs</Text>
          </View>
        <View style={styles.propertyContainerStyle}>
            <Text>Insured Amount</Text>
            <Text style={styles.propertyStyle}>N/A</Text>
          </View>
          <View style={styles.propertyContainerStyle}>
            <Text>Tax</Text>
            <Text style={styles.propertyStyle}>N/A</Text>
          </View>
          </View>
          <Divider/>
        <View style={{flexDirection:"row", justifyContent:"space-between", marginTop: 10}}>
        <Text style={{fontSize: 18}}>Total</Text>
        <Text  style={styles.paymentStyle}>{quoteData.Payment.Amount} Rs</Text>
        </View>
      </View>
  
  
        <TouchableOpacity onPress={() => {
          Alert.alert(
            'Delete Quote Record',
            "Are you sure?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Confirm", onPress: () => { deleteData(); navigation.goBack(); } }
            ]
          )
        }} style={{ marginTop: 20, padding: 10, marginBottom: 20, backgroundColor: "#068E94", width: 200, alignSelf: 'center', borderRadius: 5 }}><Text style={{ alignSelf: 'center', color: "white", fontWeight: "bold", fontSize: 18 }}>Delete Quote</Text></TouchableOpacity>
  
  
    </View>
    </ScrollView>
  
  )
  }
  
  const styles = StyleSheet.create({
  container: { backgroundColor: "#E0EFF6", height: "100%", padding: 15 },
  addressContainer:{width: "35%", fontSize: 16, fontWeight: "bold"},
  propertyContainerStyle:{flexDirection:"row", justifyContent:"space-between", marginTop: 5, alignItems: "center"},
  propertyStyle: {fontSize: 16, fontWeight: "bold"},
  paymentStyle: { fontSize: 22, fontWeight: "bold", color: "#005761" },
  
  });
  