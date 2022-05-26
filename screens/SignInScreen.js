import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Platform,
  ToastAndroid
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/context';

import logo from './images/IFLA.png';
import axios from 'axios';
import {REST_API,REST_API_LOCAL} from "@env"

const REST_API_ENDPOINT = 'http://192.168.1.102:3000/users' || REST_API+"/users";

const SignInScreen = ({route, navigation }) => {

  const [data, setData] = React.useState({
    username: '',
    password: '',
    checkusernameChange: false,
    checkPasswordChange: false,
    notValidusername: true,
    notValidPassword: true,
    secureTextEntry: true,
  });

  const { signIn } = React.useContext(AuthContext);
  
  // async function getValueFor(key) {
  //   let result = await SecureStore.getItemAsync(key);
  //   if (result) {
  //     alert("🔐 Here's your value 🔐 \n" + result);
  //   } else {
  //     alert('No values stored under that key.');
  //   }
  // }

  const sendSignInCredentials = async () => {
    
    // Click Sign In without entering data in any field.
    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{ text: 'OK' }]
      );
      return;
    }
    console.log(data.username)
    // If Username & password is incorrect.
    const body = {username:data.username, password:data.password}
    const response = await axios.post(
      `${REST_API_ENDPOINT}/login`
    , body).catch((error)=> {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        Alert.alert('Invalid User!', 'Username or password is incorrect.', [
          { text: 'OK' },
        ]);
        return;
      }
    });

    const data1 = await response.data;
    const token = data1.token;
    const user_name = data1.user.username;

    const foundUser = {userToken : token, userName : user_name}
     signIn(foundUser);

    if (data1){
      showToastWithGravity()
    }
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Logged in",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };
  const usernameChange = (text) => {
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (reg.test(String(text).toLowerCase())) {

      setData({
        ...data,
        username: text,
        checkusernameChange: true,
        notValidusername: true,
      });
    // console.log(data.username)

    // } else {
    //   setData({
    //     ...data,
    //     email: text,
    //     checkEmailChange: false,
    //     noValidEmail: false,
    //   });
    // }
  };

  const passwordChange = (text) => {
    if (text.length >= 3) {
      setData({
        ...data,
        password: text,
        notValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: text,
        notValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={logo}
          style={styles.logo}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Username"
            onChangeText={(text) => usernameChange(text)}></TextInput>
          {data.checkusernameChange ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>
        {data.notValidusername ? null : (
          <Text style={styles.errorMessage}>username Syntax is not Correct</Text>
        )}

        <View style={styles.action}>
          <FontAwesome name="lock" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(text) => passwordChange(text)}></TextInput>
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={25} />
            ) : (
              <Feather name="eye" color="grey" size={25} />
            )}
          </TouchableOpacity>
        </View>
        {data.notValidPassword ? null : (
          <Text style={styles.errorMessage}>Password must be of length 8</Text>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={{ color: '#009387', marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            onPress={() => sendSignInCredentials()}
            style={[styles.button, { backgroundColor: '#068E94' }]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: 'white',
                },
              ]}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[styles.button, { backgroundColor: 'white', borderColor:"#005761", borderWidth:1 }]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#005761',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#E0EFF6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logo: {
alignSelf:"center",
    width: 150,
    height: 100,
   
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
  button: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#068E94',
  },
});
export default SignInScreen;