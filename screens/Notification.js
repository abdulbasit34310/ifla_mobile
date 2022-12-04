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
    const [loading, setLoading] = React.useState(false);

    const getNotificationData = async ()=>{
        setLoading(true);
        let token = await SecureStore.getItemAsync("userToken");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`${REST_API_LOCAL}/notifications/getNotifications`,{
          withCredentials: true,
          headers: headers,
        })

        setData(res.data)
        setLoading(false);

    }

    React.useEffect(()=>{
    navigation.addListener("focus", () => {
        getNotificationData()
    });
    }, [navigation])

  return (
    <View style={styles.container}>
        <View style={styles.flexView}>
            <TouchableRipple style={{ width: '12%', height:"100%", borderRadius: 14, padding: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={() => {
              navigation.goBack();
            }}>
              <Entypo name='chevron-small-left' size={34} />
            </TouchableRipple>

            <TouchableRipple style={{ height:"100%", borderRadius: 14, padding: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
                console.log("pressed")
            }}>
              <Text>Clear</Text>
            </TouchableRipple>
        </View>
        {loading ? (
            <View style={[styles.flexView,{flexDirection:"column", justifyContent:"center"}]}>
            <ActivityIndicator size="large"/>
            </View>
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
                    <TouchableOpacity style={styles.flatListStyle}
                        onPress={()=>{
                            if(item.hasOwnProperty("booking"))
                                navigation.navigate("FreightBooking", { screen: "BookingDetails", params: item.booking})
                        }}
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
        padding: 20,
        backgroundColor: "#E0EFF6", height: "100%"
    },
    flexView:{
        flex:1,
        flexDirection:"row",
        paddingBottom: 15, paddingTop: 10,
        justifyContent:"space-between",
        marginVertical:"15%"
    },
    flatListStyle: {
        padding: 15,
        borderBottomColor: "#005761",
        backgroundColor: "white",
        margin: 2,
        borderRadius: 14,
        elevation: 5,
    },
})