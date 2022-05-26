import * as React from 'react';
import {
  Text, View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Button
} from 'react-native';
import axios from 'axios';
import {REST_API,REST_API_LOCAL} from "@env"
import * as SecureStore from 'expo-secure-store';

const REST_API_ENDPOINT = 'http://192.168.1.102:3000/shipper' || REST_API+"/shipper";

export default function MyBookings({route, navigation }) {
  const [bookingData, setBookingData] = React.useState();
  const [loading, setLoading] = React.useState(true);

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result
    } else {
      return "Token not in SecureStore"
    }
  }

  const getBookingsData = async () => {
    let isSubscribed = true
    const token = getValueFor('userToken');
    const headers = {"Authorization" : `Bearer ${token}`}
    const resp = await axios.get(`${REST_API_ENDPOINT}/getBookings`, {headers:headers});
    const data = resp.data.bookings;
    isSubscribed? setBookingData(data):null;
    setLoading(false);

    return ()=>(isSubscribed=false)
  };
  
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getBookingsData();
      // getValueFor('token')

    });

  }, [navigation]);


  React.useEffect(() => {
    
    getBookingsData();

  }, [setBookingData]);


  return (
    <View style={{backgroundColor: "#E0EFF6", height:"100%"}}>
      {loading && <ActivityIndicator/>}
      {bookingData &&
      <FlatList
        refreshing={false}
        onRefresh={getBookingsData}
        keyExtractor={(item, index) => index}
        data={bookingData}
        ListEmptyComponent={<Text style={{ fontSize: 24, alignSelf: 'center', marginTop: 30 }}>No Bookings Found</Text>}

        renderItem={({ item, index }) => (
          <TouchableOpacity style={{ padding: 15, borderBottomColor:'#005761',backgroundColor:"white", borderBottomWidth:1, margin:5, borderRadius:10, elevation: 24}} onPress={() => { navigation.push('BookingDetails', item) }}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text>{bookingData[index].datetime}</Text>
                <Text >Source: {bookingData[index].pickaddress.City}, {bookingData[index].pickaddress.Street}</Text>
                <Text>Destination: {bookingData[index].dropaddress.City}, {bookingData[index].dropaddress.Street}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 12, margin: 5, backgroundColor: '#00ABB2', color: "white", fontWeight: "bold", padding: 5, borderRadius: 5 }} >{bookingData[index].Status}</Text>
              <Text style={{ fontSize: 20, alignSelf: 'flex-end', fontWeight: "bold", color: '#005761' }}>{bookingData[index].Payment.Amount} Rs</Text>
            </View>
          </TouchableOpacity>
        )}
      />}
    </View>
  )
}