import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { TouchableRipple } from "react-native-paper";
import { Entypo } from '@expo/vector-icons';
import axios from 'axios'
import { REST_API_LOCAL } from "@env"
import * as SecureStore from "expo-secure-store";
import moment from "moment";


const Notification = ({ navigation }) => {
    const [data,setData] = React.useState(null)

    const getNotificationData = async ()=>{
        let token = await SecureStore.getItemAsync("userToken");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`${REST_API_LOCAL}/notifications/getNotifications`,{
          withCredentials: true,
          headers: headers,
        })

        setData(res.data)
    }

    React.useEffect(()=>{
        getNotificationData()
    }, [])

  return (
    <View style={styles.container}>
        <TouchableRipple style={{ width: '12%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom:"10%" }} onPress={() => {
          navigation.goBack();
        }}>
          <Entypo name='chevron-small-left' size={34} />
        </TouchableRipple>
        {data === null ? (
            <ActivityIndicator size="large"/>
        ):(
            <FlatList
                data={data}
                refreshing={false}
                onRefresh={getNotificationData}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={
                    <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 30 }}>
                        No Notifications Found
                    </Text>
                }
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={{backgroundColor:"#fff", paddingHorizontal:"5%", marginVertical:"1%", borderRadius:10}}
                        onPress={()=>navigation.navigate("FreightBooking", { screen: "BookingDetails", params: item.booking})}
                    >
                        <View  style={{flex:1, flexDirection:"row",alignContent:"space-between", marginVertical:"1%", paddingVertical:"10%"}}>
                            <View style={{flex:1}}>
                                <Text style={{fontSize:20, fontWeight:"bold", color:"#005761"}}>{ item.title }</Text>
                                <Text style={{color:"#005761"}}>{ item.body }</Text>
                            </View>
                            <Text style={{color:"#005761"}}>{ moment(item.time).utc().format("MMM Do, h:mm a") }</Text>
                        </View>
                    </TouchableOpacity>
                    
                )}
            />
        )}
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#E0EFF6",
    }
})