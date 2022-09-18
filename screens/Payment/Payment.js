import { StyleSheet, Text, Alert,TextInput, Button, View } from "react-native";
import React,{useState, useEffect} from "react";
import {StripeProvider, CardField, useConfirmPayment} from '@stripe/stripe-react-native';

const Payment = () => {
  const [name, setName] = useState('');
  const {confirmPayment, loading} = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`http://192.168.100.19:4000/payments/create-checkout-session`, {
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
      }
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
          cardStyle={styles.input}
          style={styles.cardField}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
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
      // placeholderColor: '#999999',
  }
});
