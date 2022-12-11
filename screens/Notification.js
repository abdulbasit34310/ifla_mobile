import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { TouchableRipple } from "react-native-paper";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'
import { StatusBar } from 'expo-status-bar';
import { REST_API_LOCAL } from "@env"
import * as SecureStore from "expo-secure-store";
import moment from "moment";


const Notification = ({ navigation }) => {
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(false);

    const getNotificationData = async () => {
        setLoading(true);
        let token = await SecureStore.getItemAsync("userToken");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`${REST_API_LOCAL}/notifications/getNotifications`, {
            withCredentials: true,
            headers: headers,
        })

        setData(res.data)
        setLoading(false);

    }

    const deleteNotifs = async ()=>{
        let token = await SecureStore.getItemAsync("userToken");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.delete(`${REST_API_LOCAL}/notifications/deleteAll`, {
            withCredentials: true,
            headers: headers,
        })
        navigation.goBack()
    }

    React.useEffect(() => {
        navigation.addListener("focus", () => {
            getNotificationData()
        });
    }, [navigation])

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.flexView}>
                <TouchableRipple style={{ width: 50, borderRadius: 14, padding: 5, elevation: 5, backgroundColor: 'white',alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                    navigation.goBack();
                }}>
                    <Entypo name='chevron-small-left' size={34} />
                </TouchableRipple>

                <TouchableRipple style={{ borderRadius: 14, paddingHorizontal: 15, elevation: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
                    Alert.alert("Clear Notifications", "Are you sure?", [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Confirm",
                          onPress: () => {
                            deleteNotifs()
                          },
                        },
                      ]);
                     }}>
                    <View style={{flexDirection:"row", }}>
                        <MaterialCommunityIcons
                            name="delete-sweep"
                            size={22}
                            color={"#C00001"}
                        />
                        <Text style={{marginLeft:3, fontSize:16}} >Clear</Text>
                    </View>
                </TouchableRipple>
                
            </View>
            {loading ? (
                <View style={[styles.flexView, { flexDirection: "column", justifyContent: "center" }]}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
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
                            onPress={() => {
                                if (item.hasOwnProperty("booking"))
                                    navigation.navigate( "BookingDetails",  item.booking )
                            }}
                        >
                            <View style={{ flex: 1, flexDirection: "row", alignContent: "space-between", marginVertical: "1%", paddingVertical: "10%" }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#005761" }}>{item.title}</Text>
                                    <Text style={{ color: "#005761" }}>{item.body}</Text>
                                </View>
                                <Text style={{ color: "#005761" }}>{moment(item.time).utc().format("MMM Do, h:mm a")}</Text>
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
        padding: 10,
        backgroundColor: "#E0EFF6", flex: 1,
    },
    flexView: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 25 
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