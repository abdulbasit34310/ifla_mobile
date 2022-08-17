import * as React from 'react';
import { View, StyleSheet, Image, Alert, Button} from 'react-native';
import Constants from 'expo-constants';
import IFLA from './images/IFLA.png';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const MainScreen = ({route,navigation}) => {
    const [token,setToken] = React.useState()
    function getValueFor() {
        let result = SecureStore.getItemAsync("userToken").then(val=>setToken(val));
        // console.log(result)
        // if (result) 
        // // { 
        //     setToken(result)
      }

    // const request = ()=>{
    //     console.log(token)
    //     var obj = {  
    //         method: 'POST',
    //         withCredentials: true,
    //         credentials: 'include',
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //       }
    //     fetch('http://192.168.43.10:3000/users/testAuth', obj)  
    //     .then(function(res) {
    //         return res.json();
    //     })
    //     .then(function(resJson) {
    //         console.log(resJson)
    //         return resJson;
    //     })
    // }
    // React.useEffect(()=>{
    //     navigation.addListener('focus', () => {
    //     getValueFor()
    //     // request()
    //     })
    // },[navigation])
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
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#00ABB2',
        alignItems: 'center',
    },
});