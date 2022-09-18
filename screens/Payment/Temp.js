import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
// import {Permissions} from  'expo'
import {StripeProvider} from '@stripe/stripe-react-native';

export default function Temp({navigation}) {
  const [publishableKey,setPublishableKey] = useState(null);
  
  const getPublishableKey = async ()=>{
    try {
      const response = await fetch('http://192.168.100.19:4000/payments/config')
      const {publishableKey} = await response.json();
  
      return publishableKey;
    } catch (e) {
      console.log(e);
      console.warn('Unable to fetch publishable key. Is your server running?');
      Alert.alert(
        'Error',
        'Unable to fetch publishable key. Is your server running?'
      );
      return null;
    }
  }

  useEffect( ()=>{
    async function initialize() {
      const publishableKey = await getPublishableKey()
      if (publishableKey) {
        setPublishableKey(publishableKey);
    }}

    initialize()
    },[])

  return (
    <StripeProvider  publishableKey={publishableKey}>
      <View style={styles.container}>
        {publishableKey? (
        <Text>{publishableKey}</Text>
        ):(
        <Text>hi</Text>
        )}
        <Button
          title="hi"
          onPress={ () => {
            navigation.navigate("Pay")
          }}
        />
        <StatusBar style="auto" />
      </View>
    </StripeProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
