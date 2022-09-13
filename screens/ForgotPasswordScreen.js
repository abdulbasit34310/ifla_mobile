import * as React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import logo from './images/IFLA.png';
import axios from 'axios';

const FIREBASE_API_ENDPOINT =
  'https://madproject-61e88-default-rtdb.firebaseio.com/';
const REST_API_ENDPOINT = "http://192.168.10.8:3000/users"
var arr = [];

const ForgotPasswordScreen = ({ navigation }) => {

  const [data, setData] = React.useState({
    email: '',
    checkEmailChange: false,
    notValidEmail: true,
  });

  const emailChange = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(String(text).toLowerCase())) {
      setData({
        ...data,
        email: text,
        checkEmailChange: true,
        notValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: text,
        checkEmailChange: false,
        notValidEmail: false,
      });
    }
  };
//  {withCredentials:true, headers: {"Authorization": `Bearer ${token1}`}}
  const forgotpassword = (email) => {
    axios.post(`${REST_API_ENDPOINT}/forgotpassword`,{email:email})
   };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={logo}
          style={styles.logo}
        />
      </View>

      <View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#009387" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Email"
            onChangeText={(email) => emailChange(email)}></TextInput>
          {data.checkEmailChange ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>
        {data.notValidEmail ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>
              Email Syntax is not correct.
            </Text>
          </View>
        )}
      <TouchableOpacity style={styles.to} onPress={()=>{forgotpassword(data.email)}}>
        <Text style={styles.signInText}>Reset Password</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    alignItems:"center",
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logo: {
    marginLeft: '35%',
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  ti: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMessage: {
    color: '#FF0000',
    fontSize: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#009387',
  },
  signInText: {
    color: "#E0EFF6",
    fontSize: 26,

},
to: {
    backgroundColor: '#00ABB2',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 175,
    height: 75,
    flexDirection: 'row',
    marginTop: 35,
},

});

export default ForgotPasswordScreen;