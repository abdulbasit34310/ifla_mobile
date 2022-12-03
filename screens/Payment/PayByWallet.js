import React from "react";
import { View,Text,StyleSheet, TouchableOpacity } from "react-native";
import { REST_API_LOCAL } from "@env";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Feather } from 'react-native-vector-icons';
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function PayByWallet({navigation, route}){
    const {amount, isPayable, bookingId, payId } = route.params
    const [disable, isDisabled] = React.useState(true)

    const pay = async ()=>{
        isDisabled(true)
        let token1 = await SecureStore.getItemAsync("userToken");
        const body = { status:"Paid", amount:-amount, bookingId:bookingId, payId : payId }
        const headers = { Authorization: `Bearer ${token1}` };
        const response = await axios.post(
          `${REST_API_LOCAL}/payments/payByWallet`, body,
          { withCredentials: true, headers: headers }
        );
        console.log(response.data)
        isDisabled(false)
        // navigation.navigate("BookingScreen")
    }

    React.useEffect(()=>{
        isPayable ? pay():null
    },[])
   
    return(
        <View style={styles.container}>
            {
                isPayable ? (
                    <View>
                        <Text style={[styles.textStyle, {alignSelf:"center"}]}>Paid for Booking</Text>
                        <View style={{flexDirection:"row", width:150, height:150, marginVertical:30, padding:30,borderRadius:100, backgroundColor:"#35BE25",alignItems:"center", alignSelf:"center", justifyContent:"center"}}>
                            <MaterialIcons name="check" size={70} color="#fff"/>
                        </View>
                        <View style={{marginVertical:30}}>
                            <Text style={[styles.textStyle, {alignSelf:"center"}]}>Paid PKR {amount}</Text>
                            <TouchableOpacity disabled={disable} onPress={()=>navigation.navigate("BookingScreen")} style={styles.button}>
                                <MaterialIcons name="arrow-back-ios" size={20} color="#fff"/>
                                <Text style={styles.buttonText}>
                                    Bookings
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ):(
                    <View>
                        <Text style={styles.textStyle}>Not Enough Money in Wallet</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("LoadMoneyToWallet")} style={styles.button}>
                            <Text style={styles.buttonText}>Add Money to Wallet</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:"center",
    //   marginTop: 50,
      justifyContent:"center",
    //   backgroundColor: "#068E94",
    },
    row:{
        // flex:1,
        flexDirection:"row"
    },
    textStyle: { fontSize: 22, fontWeight: "bold", color:"#005761"},
    button: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: "#068E94",
        width: 200,
        justifyContent: "center",
        borderRadius:15,
        flexDirection:"row"
    },
    buttonText: {
        alignSelf: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
  });
 