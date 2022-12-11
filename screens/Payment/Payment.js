import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Animated, ActivityIndicator, Alert, Button, Dimensions, FlatList, Image, StyleSheet, Switch, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Divider, TouchableRipple } from "react-native-paper";
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { CardField, StripeProvider, useConfirmPayment, } from "@stripe/stripe-react-native";
import axios from "axios";
import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";

const Payment = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();
  // const [saveCard, setSaveCard] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [publishableKey, setPublishableKey] = useState(null);

  let payId,
    id = undefined;
  if (route.params.hasOwnProperty("payId")) payId = route.params.payId;
  if (route.params.hasOwnProperty("amount")) amount = route.params.getNo;

  const getPublishableKey = async () => {
    try {
      const response = await fetch(`${REST_API_LOCAL}/payments/config`);
      const { publishableKey } = await response.json();
      return publishableKey;
    } catch (e) {
      console.log(e);
      console.warn("Unable to fetch publishable key. Is your server running?");
      Alert.alert(
        "Error",
        "Unable to fetch publishable key. Is your server running?"
      );
      return null;
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    const body = { payId: payId, id: id, amount: route.params.getNo };
    const response = await axios.post(
      `${REST_API_LOCAL}/payments/create-checkout-session`,
      body
    );
    const { clientSecret } = await response.data;

    return clientSecret;
  };

  useEffect(() => {
    async function initialize() {
      const publishableKey = await getPublishableKey();
      if (publishableKey) {
        setPublishableKey(publishableKey);
      }
    }

    initialize();
  }, []);

  const handlePayPress = async () => {
    // 1. fetch Intent Client Secret from backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: { name },
      },
      // { setupFutureUsage: saveCard ? 'OffSession' : undefined }
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      console.log("Payment confirmation error", error.message);
    } else if (paymentIntent) {
      Alert.alert(
        "Success",
        `The payment was confirmed successfully! currency: ${paymentIntent.amount / 100
        } ${paymentIntent.currency}`
      );
      let token1 = await SecureStore.getItemAsync("userToken");
      const headers = { Authorization: `Bearer ${token1}` };
      if (route.params.hasOwnProperty("getNo") && !route.params.isInsurance){
        const response = await axios.post(`${REST_API_LOCAL}/payments/addToWallet`, {amount: route.params.getNo}, {
          withCredentials: true,
          headers: headers,
        });
        navigation.popToTop()
      }
      else if(route.params.hasOwnProperty("payId")  && !route.params.isInsurance){
        const response = await axios.post(`${REST_API_LOCAL}/payments/paymentUpdate`, {payId: route.params.payId}, {
          withCredentials: true,
          headers: headers,
        });
        navigation.navigate("FreightBooking", {screen: "BookingScreen"})
      }
      else{
        navigation.navigate("Insurance")
      }
    }
  };

  return (
    <StripeProvider publishableKey={publishableKey}>
      <View style={styles.container}>
      <TouchableRipple
        style={{
          width: "12%",
          borderRadius: 14,
          padding: 7,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Entypo name="chevron-small-left" size={34} />
      </TouchableRipple>
      <View style={{marginTop:80}} ></View>
        <View style={styles.action}>
          <TextInput
            autoCapitalize="none"
            placeholder="Name"
            keyboardType="name-phone-pad"
            onChange={(value) => setName(value.nativeEvent.text)}
            style={styles.input}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            keyboardType="email-address"
            onChange={(value) => setName(value.nativeEvent.text)}
            style={styles.input}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            autoCapitalize="none"
            placeholder="Contact Number"
            keyboardType="number-pad"
            onChange={(value) => setName(value.nativeEvent.text)}
            style={styles.input}
          />
        </View>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          onCardChange={(cardDetails) => {
            if(cardDetails.complete)
              setComplete(true)
            if(!cardDetails.complete && isComplete)
              setComplete(false)
          }}
          cardStyle={inputStyles}
          style={styles.cardField}
        />
        {/* <View style={styles.row}>
          <Switch
            onValueChange={(value) => setSaveCard(value)}
            value={saveCard}
          />
          <Text style={styles.text}>Save Card During Payment</Text>
        </View> */}

        <TouchableOpacity
          style={ loading || !isComplete ?  [styles.customButton, { marginTop:"20%",backgroundColor: "#8C8E8B" }]:[styles.customButton, { marginTop:"20%",backgroundColor: "#068E94" }]}
          onPress={handlePayPress}
          disabled={loading || !isComplete }
        >
          <Text style={  loading || !isComplete ?  [styles.buttonText, {color: "#CFD0CF"}]: [styles.buttonText,{ color: "white" }] }>
            Pay </Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0EFF6',
    // justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 20
  },
  action: {
    flexDirection: "row",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    paddingBottom: 5,
    borderRadius: 8,
  },
  cardField: {
    width: "100%",
    height: 50,
    marginTop: 70,
  },
  input: {
    paddingLeft: 12,
    color: "#05375a",
    fontSize: 16,
    height: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
  },
  text: {
    marginLeft: 14,
  },
  ButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  customButton: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    elevation: 5,
  },
  ti: {
    borderColor: 'red',
    borderBottomWidth: 1,
    width: '35%',
    borderBottomColor: "#AAAAAA",
  }
});

const inputStyles = {
  borderWidth: 1,
  backgroundColor: "#FFFFFF",
  borderColor: "#000000",
  borderRadius: 8,
  fontSize: 14,
  placeholderColor: "#999999",
};