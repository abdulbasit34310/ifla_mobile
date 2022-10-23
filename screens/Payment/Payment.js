import {
  StyleSheet,
  Text,
  Alert,
  TextInput,
  Switch,
  Button,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import axios from "axios";
import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";

const Payment = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();
  const [saveCard, setSaveCard] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [publishableKey, setPublishableKey] = useState(null);


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
    let payId,amount = undefined;
    if (route.params.hasOwnProperty("payId")) payId = route.params.payId;
    if (route.params.hasOwnProperty("getNo")){
      amount = route.params.getNo;
    }
    const body = { payId: payId, amount:amount};
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

    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: "Card",
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
      // console.log("Success from promise", paymentIntent);

      if (route.params.hasOwnProperty("getNo")){
        let token1 = await SecureStore.getItemAsync("userToken");
        const headers = { Authorization: `Bearer ${token1}` };
        const response = await axios.post(`${REST_API_LOCAL}/payments/addToWallet`, {amount: route.params.getNo}, {
          withCredentials: true,
          headers: headers,
        });
      }

      navigation.popToTop()
    }
  };

  return (
    <StripeProvider publishableKey={publishableKey}>
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          placeholder="Name"
          keyboardType="name-phone-pad"
          onChange={(value) => setName(value.nativeEvent.text)}
          style={styles.input}
        />
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          // onCardChange={(cardDetails) => {
          //   console.log("cardDetails", cardDetails);
          // }}
          // onFocus={(focusedField) => {
          //   console.log("focusField", focusedField);
          // }}
          cardStyle={inputStyles}
          style={styles.cardField}
        />
        <View style={styles.row}>
          <Switch
            onValueChange={(value) => setSaveCard(value)}
            value={saveCard}
          />
          <Text style={styles.text}>Save card during payment</Text>
        </View>
        <TouchableOpacity
          style={styles.ButtonContainer}
          onPress={handlePayPress}
          disabled={loading}
        >
          <Text style={styles.customButton}>Pay</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
  },
  cardField: {
    width: "100%",
    height: 50,
    marginVertical: 30,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderRadius: 8,
    fontSize: 14,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    marginLeft: 12,
  },
  ButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  ButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  customButton: {
    backgroundColor: '#005761',
    padding: 5,
    borderRadius: 35,
    elevation: 5,
    alignSelf: "center",
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
