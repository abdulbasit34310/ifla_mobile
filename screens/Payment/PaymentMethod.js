import React from "react";
import { View,Text,Button,StyleSheet } from "react-native";
import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function PaymentMethod({navigation, route}){
    const {payId, amount, bookingId} = route.params
    const [balance,setBalance] = React.useState(0)

    const getBalance = async ()=>{
        let token1 = await SecureStore.getItemAsync("userToken");

        const headers = { Authorization: `Bearer ${token1}` };
        const response = await axios.get(
          `${REST_API_LOCAL}/payments/getBalance`,
          { withCredentials: true, headers: headers }
        );
        console.log(response.data)
        setBalance(response.data.wallet)
    }

    React.useEffect(()=>{
        navigation.addListener("focus", () => {
            getBalance()
        });
    },[navigation])

    return(
        <View>
            <Text>PaymentMethod</Text>
            <Text>Money in Wallet: PKR {balance} </Text>
            <Text> {balance>=amount} </Text>
            <Button title="Wallet" onPress={()=>navigation.navigate("PayByWallet", {bookingId : bookingId, payId : payId, amount: amount, isPayable:balance>=amount})}>Wallet</Button>
            <Button title="Credit Card" onPress={()=>navigation.navigate("Payment", { payId : payId})}>Credit Card</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#068E94",
    },
  });
 