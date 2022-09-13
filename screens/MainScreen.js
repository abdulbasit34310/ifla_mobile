
import React,{ useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Platform} from 'react-native';
import Constants from 'expo-constants';
import IFLA from './images/IFLA.png';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/context';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
const axios = require("axios")

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
  registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);

      var response = await axios.post("http://192.168.10.8:3000/notifications/token",{token:{value:token}})
      // this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
   
     return token;
   
   };
  
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

const MainScreen = ({route,navigation}) => {
    const [token,setToken] = React.useState()
    const { signOut } = React.useContext(AuthContext)
    const [pushToken,setPushToken] = useState(null);
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    useEffect(()=>{
      registerForPushNotificationsAsync().then(token => setPushToken(token));
  
       // This listener is fired whenever a notification is received while the app is foregrounded
       notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    },[])

    function getValueFor() {
        let result = SecureStore.getItemAsync("userToken").then(val=>setToken(val));
        // console.log(result)
        // if (result) 
        // // { 
        //     setToken(result)
      }
    const deleteToken= ()=>{
        SecureStore.deleteItemAsync("userToken");
        signOut()
    }
    return false;
  };

  const isTokenExpired = () => {
    if (token) {
      const expiry = JSON.parse(atob(token.split(".")[1])).exp;
      console.log(expiry);
      console.log(Math.floor(new Date().getTime() / 1000) >= expiry);
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    }
    return false;
  };


    React.useEffect(()=>{
        navigation.addListener('focus', () => {
        getValueFor()
        if(isTokenExpired())
            deleteToken()
        })
    },[navigation])
    return (
        <View style={styles.container}>
            <Image
                style={{
                    backgroundColor: "#00ABB2",
                    width: 335,
                    height: 275,
                }}
                source={IFLA}
            />
        </View>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#00ABB2",
    alignItems: "center",
  },
});
