import React from "react";
import { View,Text,Button,StyleSheet } from "react-native";
import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function PayByWallet({navigation, route}){
    const {amount, isPayable, bookingId, payId } = route.params
    // amount = -amount
    const pay = async ()=>{
        let token1 = await SecureStore.getItemAsync("userToken");
        const body = { status:"Paid", amount:-amount, bookingId:bookingId, payId : payId }
        const headers = { Authorization: `Bearer ${token1}` };
        const response = await axios.post(
          `${REST_API_LOCAL}/payments/payByWallet`, body,
          { withCredentials: true, headers: headers }
        );
        console.log(response.data)
        navigation.navigate("BookingScreen")
    }

    React.useEffect(()=>{
        isPayable ? pay():null
    },[])
   
    return(
        <View style={styles.container}>
            <Text>Pay By Wallet</Text>
            {
                isPayable ? (
                    <Text>Paid for Booking</Text>
                ):(
                    <View>
                    <Text>Not Enough Money in Wallet</Text>
                    <Button title="Add Money to Wallet" onPress={()=>navigation.navigate("LoadMoneyToWallet")}/>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#068E94",
    },
  });
  