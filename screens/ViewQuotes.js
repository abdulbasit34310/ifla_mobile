
import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground,
  TouchableOpacity,
  ScrollView, FlatList, Alert
} from 'react-native';


const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';

export default function ViewQuotes ({ navigation, route }){
    const [quoteData, setQuoteData] = React.useState({});
  
    const getQuoteData = async () => {
      const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings.json`);
      const data = await response.json();
      var id=Object.keys(data);
      var pendingData={};
      console.log(id);
      for (let i=0;i<id.length;i++){
          let key=id[i];
          console.log(data[key].Status);
            if(data[key].Status==="In-Process"){
                pendingData[key]=data[key];
            }
    }
    console.log(pendingData);
      setQuoteData(pendingData);      
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
            data={Object.keys(quoteData)}
            ListEmptyComponent={<Text style={{fontSize:24, alignSelf: 'center', marginTop: 30}}>No Bookings Found</Text>}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={{padding: 15, borderBottomColor:'#005761',backgroundColor:"white", borderBottomWidth:1, margin:5, borderRadius:10, elevation: 24}} onPress={()=>{navigation.push('QuoteDetails', {item: item})}}>
                <View style={{flexDirection: 'row'}} >
                <View>
                <Text>Shipment Type: FTL</Text> 
                <Text >Source: {quoteData[item].PickupCity}</Text>
                <Text>Destination: {quoteData[item].DropoffCity}</Text>
                </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{fontSize: 20,fontWeight: "bold"}} >Estimated Price</Text>
                <Text style={{fontSize: 20, alignSelf:'flex-end', fontWeight: "bold"}}>{quoteData[item].Offer} Rs</Text>
                </View>
              </TouchableOpacity>
            )}
          />
      </View>
    )
  }