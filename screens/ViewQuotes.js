
import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  ScrollView, FlatList, Alert
} from 'react-native';
import {REST_API,REST_API_LOCAL} from "@env"
import axios from 'axios';

const REST_API_ENDPOINT = 'http://192.168.1.102:3000/shipper' || REST_API+"/shipper";

const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';

export default function ViewQuotes ({ navigation, route }){
    const [quoteData, setQuoteData] = React.useState();
  
    const getQuoteData = async () => {
      const response = await axios.get(`${REST_API_ENDPOINT}/getQuotes`);
      const data = await response.data.bookings;
    //   var id=Object.keys(data);
    //   var pendingData={};
    //   console.log(id);
    //   for (let i=0;i<id.length;i++){
    //       let key=id[i];
    //       console.log(data[key].Status);
    //         if(data[key].Status==="In-Process"){
    //             pendingData[key]=data[key];
    //         }
    // }
      console.log(data);
      setQuoteData(data);      
    };
  
    React.useEffect(() => {
      getQuoteData();
    }, [setQuoteData]);
  
    React.useEffect(() => {
      navigation.addListener('focus', () => {
        getQuoteData();
      });

    }, [navigation]);
  
    return(
      <View style={{backgroundColor: "#E0EFF6", height:"100%"}}>
        <FlatList
            refreshing={false}
            onRefresh={getQuoteData}
            keyExtractor={(item, index) => index}
            data={quoteData}
            ListEmptyComponent={<Text style={{fontSize:24, alignSelf: 'center', marginTop: 30}}>No Bookings Found</Text>}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={{padding: 15, borderBottomColor:'#005761',backgroundColor:"white", borderBottomWidth:1, margin:5, borderRadius:10, elevation: 24}} onPress={()=>{navigation.push('QuoteDetails', {item: item})}}>
                <View style={{flexDirection: 'row'}} >
                <View>
                <Text>Shipment Type: {item.bookdetails.Type}</Text> 
                <Text >Source: {item.pickaddress.City}</Text>
                <Text>Destination: {item.dropaddress.City}</Text>
                </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{fontSize: 20,fontWeight: "bold"}} >Estimated Price</Text>
                <Text style={{fontSize: 20, alignSelf:'flex-end', fontWeight: "bold"}}>{item.Payment.Amount} Rs</Text>
                </View>
              </TouchableOpacity>
            )}
          />
      </View>
    )
  }