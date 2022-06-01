import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView, FlatList, Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Divider } from 'react-native-paper';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';

export default function BookingDetails({navigation, route}){
    const item = route.params;
    const [bookingData, setBookingData]= React.useState(item);

    const deleteData = () => {
      var requestOptions = {
        method: 'DELETE',
      };
  
      fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log('Delete Response:', result))
        .catch((error) => console.log('error', error));
    };
  
  
    // React.useEffect(() => {
    //   getBookingsData();
    // }, [setBookingData]);
  
    return(
    <ScrollView>
    <View style={styles.container}>
    <Text style={{fontSize: 30, fontWeight: "bold", marginLeft: 20, color: "#005761"}} >{bookingData.bookdetails.Type=="FTL"? "Full Truck Load": "Less Than Truck Load"}</Text>
    <Text style={{fontSize: 16, fontWeight: "bold", marginLeft: 20, color: "black" }}>{bookingData.datetime}</Text>
    <View style={{elevation:8, backgroundColor:"white", margin:15, padding:25, borderRadius: 10}}> 
      <View style={{flexDirection:"row" , justifyContent: "space-between", marginVertical:5}}>
        <Text style={{fontSize: 16}} ><FontAwesome name="location-arrow" color="#005761" size={20} /> Source
        </Text>
        <Text style={{fontSize: 16}} ><FontAwesome name="map-marker" color="#005761" size={20} /> Destination</Text>
        </View>

        <View style={{flexDirection:"row" , justifyContent: "space-between"}}>
          
      <Text style={styles.addressContainer}>{bookingData.pickaddress.City}, {bookingData.pickaddress.Building} {bookingData.pickaddress.Street}</Text>
      <Text style={styles.addressContainer}>
        {bookingData.dropaddress.City}, {bookingData.dropaddress.Building} {bookingData.dropaddress.Street}          </Text>
      </View>
      <Divider/>
      <View style={{marginVertical: 25}}>
        <View style={styles.propertyContainerStyle}>
          <Text >Weight</Text>
          <Text style={styles.propertyStyle}>{bookingData.bookdetails.Weight} kg</Text>
        </View>

        <View style={styles.propertyContainerStyle}>
          <Text >Insurance</Text>
          <Text style={styles.propertyStyle}>No</Text>
        </View>
        
        <View style={styles.propertyContainerStyle}>
          <Text>Quantity</Text>
          <Text style={styles.propertyStyle}>{bookingData.bookdetails.Quantity} Pcs</Text>
        </View>

        <View style={styles.propertyContainerStyle}>
          <Text>Status</Text>
          <Text style={styles.propertyStyle}>{bookingData.Status}</Text>
        </View>
      </View>
      <Divider/>
      <View style={{marginVertical:20}}>
      <View style={styles.propertyContainerStyle}>
          <Text>Sub Total</Text>
          <Text style={styles.propertyStyle}>{bookingData.Payment.Amount} Rs</Text>
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
      <Text  style={styles.paymentStyle}>{bookingData.Payment.Amount} Rs</Text>
      </View>
    </View>







      <TouchableOpacity onPress={() => {
        Alert.alert(
          'Delete Booking Record',
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
      }} style={{ marginTop: 20, padding: 10, marginBottom: 20, backgroundColor: "#068E94", width: 200, alignSelf: 'center', borderRadius: 5 }}><Text style={{ alignSelf: 'center', color: "white", fontWeight: "bold", fontSize: 18 }}>Delete Booking</Text></TouchableOpacity>


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
