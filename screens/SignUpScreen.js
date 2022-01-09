import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import logo from './images/Falas.png';

//import { AuthContext } from '../components/context';

const FIREBASE_API_ENDPOINT =
  'https://madproject-61e88-default-rtdb.firebaseio.com/';

const SignUpScreen = ({ navigation }) => {

  const [data, setData] = React.useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    checkNameChange: false,
    checkEmailChange: false,
    checkPasswordChange: false,
    checkConfirmPasswordChange: false,
    secureTextEntry: true,
  });

  const postData = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        username: data.username,
        password: data.password,
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/madProject.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  const nameChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        name: val,
        checkNameChange: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        checkNameChange: false,
      });
    }
  };

  const emailChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        checkEmailChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        checkEmailChange: false,
      });
    }
  };

  const PasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const ConfrimPasswordChange = (val) => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.footer}>
        <Text style={styles.title}>Name</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#009387" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Name"
            onChangeText={(val) => nameChange(val)}></TextInput>
          {data.checkNameChange ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#009387" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Email"
            onChangeText={(val) => emailChange(val)}></TextInput>
          {data.checkEmailChange ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>

        <Text style={styles.title}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#009387" size={26} />
          <TextInput
            style={styles.ti}
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => PasswordChange(val)}></TextInput>

          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={25} />
            ) : (
              <Feather name="eye" color="grey" size={25} />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Confirm Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#009387" size={26} />
          <TextInput
            style={styles.ti}
            placeholder="Confrim Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => ConfrimPasswordChange(val)}></TextInput>

          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={25} />
            ) : (
              <Feather name="eye" color="grey" size={25} />
            )}
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => postData()}
            style={[styles.button, { backgroundColor: '#009387' }]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: 'white',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainScreen')}
            style={[styles.button, { backgroundColor: '#f2f2f2' }]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#009387',
                },
              ]}>
              Sign In
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  // actionError: {
  //     flexDirection: 'row',
  //     marginTop: 10,
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#FF0000',
  //     paddingBottom: 5,
  // },
  ti: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#009387',
  },
  // errorMsg: {
  //     color: '#FF0000',
  //     fontSize: 14,
  // },
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
    backgroundColor: '#009387',
  },
});

export default SignUpScreen;
