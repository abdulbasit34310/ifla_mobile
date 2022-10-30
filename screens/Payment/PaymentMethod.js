import React from "react";
import { View,Text,Button,StyleSheet, TouchableOpacity } from "react-native";
import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function PaymentMethod({navigation, route}){
    const {payId, amount, bookingId} = route.params
    const [balance,setBalance] = React.useState(0)
    const [disable, isDisabled] = React.useState(true)
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
            isDisabled(true)
            getBalance();
            isDisabled(false)
        });
    },[navigation])

    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>Choose your Payment Method</Text>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} disabled={disable} onPress={()=>navigation.navigate("PayByWallet", {bookingId : bookingId, payId : payId, amount: amount, isPayable:balance>=amount})}>
                    <Text style={styles.buttonText}>Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Payment", { payId : payId})}>
                    <Text style={styles.buttonText}>Credit Card</Text>
                </TouchableOpacity>
            </View>
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
    textStyle: { fontSize: 22, fontWeight: "bold", color: "#005761" },
    button: {
        marginVertical: 20,
        padding: 10,
        marginHorizontal:1,
        backgroundColor: "#068E94",
        width: 150,
        height: 150,
        alignSelf: "center",
        borderRadius: 10,
        borderColor:"#333",
        borderWidth:1,
        justifyContent:"center",
    },
    buttonText: {
        alignSelf: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
  });
 