import { StyleSheet, Text, Alert,TextInput,  Switch, Button, View, TouchableOpacity } from "react-native";
import React,{useState} from "react";
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';

const Payment = () => {
  const [name, setName] = useState('');
  const {confirmPayment, loading} = useConfirmPayment();
  const [saveCard, setSaveCard] = useState(false);
  const [isComplete, setComplete] = useState(false);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`http://192.168.8.102:4000/payments/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const {clientSecret} = await response.json();

    return clientSecret;
  };

  const handlePayPress = async () => {
    // 1. fetch Intent Client Secret from backend
    const clientSecret = await fetchPaymentIntentClientSecret();


    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      type: 'Card',
      paymentMethodData: {
          billingDetails: {name},
      },
      // { setupFutureUsage: saveCard ? 'OffSession' : undefined }
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      console.log('Payment confirmation error', error.message);
    } else if (paymentIntent) {
      Alert.alert(
        'Success',
        `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
      );
      console.log('Success from promise', paymentIntent);
    }
  };

  return(
      <View>
           <TextInput
              autoCapitalize="none"
              placeholder="Name"
              keyboardType="name-phone-pad"
              onChange={(value) => setName(value.nativeEvent.text)}
              style={styles.input}
            />
           <TextInput
              autoCapitalize="none"
              placeholder="Email"
              keyboardType="email-address"
              onChange={(value) => setName(value.nativeEvent.text)}
              style={styles.input}
            />
           <TextInput
              autoCapitalize="none"
              placeholder="Contact Number"
              keyboardType="number-pad"
              onChange={(value) => setName(value.nativeEvent.text)}
              style={styles.input}
            />
        <CardField
            postalCodeEnabled={false}
            placeholder={{
            number: '4242 4242 4242 4242',
            }}
            onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
            }}
            onFocus={(focusedField) => {
            console.log('focusField', focusedField);
            }}
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
      <TouchableOpacity style={styles.ButtonContainer} onPress={handlePayPress} disabled={loading} >
            <Text style={styles.ButtonText}>Pay</Text>
      </TouchableOpacity>
      </View>
  )
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  cardField: {
      width: '100%',
      height: 50,
      marginVertical: 30,
    },
  input: {
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      borderColor: '#000000',
      borderRadius: 8,
      fontSize: 14,
      marginVertical:5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 12
  },
  ButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

const inputStyles = {
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
  borderColor: '#000000',
  borderRadius: 8,
  fontSize: 14,
  placeholderColor: '#999999',
};