import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { TouchableRipple } from "react-native-paper";
import { Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
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
            <View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

                <TouchableRipple style={{ width: 50,
                 height: 50, borderRadius: 14, 
                 padding: 5, elevation: 5, 
                 backgroundColor: 'white',alignItems: 'center',
                  justifyContent: 'center', marginLeft: 10, marginTop: 10 }} onPress={() => {
                    navigation.goBack();
                }}>
                    <Entypo name='chevron-small-left' size={34} />
                </TouchableRipple>

                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 34, }}>
                            Your
                        </Text>
                        <Text style={{ fontSize: 38, fontWeight: 'bold' }}>
                            Notifications
                        </Text>
                    </View>

                    <TouchableRipple style={{ width: '15%', marginTop: 15, borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom: "10%" }} onPress={() => {
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
                        <MaterialCommunityIcons name='notification-clear-all' size={34} />
                    </TouchableRipple>
                </View>
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
                        <TouchableOpacity style={styles.notificationCard}
                            onPress={() => {
                                if (item.hasOwnProperty("booking"))
                                    navigation.navigate( "BookingDetails",  item.booking )
                            }}
                        >
                                            <View style={{ flex: 1, flexDirection: "row", alignContent: "space-between", }}>
                                <View style={{ backgroundColor: "#00ABB2", borderRadius: 14, width: '15%', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <Ionicons name="notifications-outline" color={"white"} size={22} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: "#005761" }}>{item.body}</Text>
                                    <Text style={{ color: "#005761" }}>{moment(item.time).utc().format("MMM Do, h:mm a")}</Text>
                                </View>

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
        paddingHorizontal: 20,
        paddingVertical: 35,
        backgroundColor: "white",
    },
    notificationCard: {
        backgroundColor: "#E0EFF6",
        padding: 15,
        borderRadius: 14,
        margin: 5
    }
})