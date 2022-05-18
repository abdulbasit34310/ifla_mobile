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
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../components/context';
import logo from './images/Falas.png';


const FIREBASE_API_ENDPOINT =
  'https://madproject-61e88-default-rtdb.firebaseio.com/';

var arr = [];

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    checkEmailChange: false,
    checkPasswordChange: false,
    notValidEmail: true,
    notValidPassword: true,
    secureTextEntry: true,
  });

  const [data2, setData2] = React.useState(arr);

  const { signIn } = React.useContext(AuthContext);

  const getCredentials = async () => {
    const response = await fetch(
      `${FIREBASE_API_ENDPOINT}/userCredentials.json`
    );
    const data = await response.json();

    var keyValues = Object.keys(data);
    let credential = {};
    for (let i = 0; i < keyValues.length; i++) {
      let key = keyValues[i];
      credential = {
        email: data[key].email,
        password: data[key].password,
      };
      arr.push(credential);
      setData2(arr)
    }
  };

  React.useEffect(() => {
    getCredentials();
  }, [arr]);

  const sendSignInCredentials = (e, p) => {

    const foundUser = arr.filter((item) => {
      return e == item.email && p == item.password;
    });

    // Click Sign In without entering data in any field.
    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{ text: 'Okay' }]
      );
      return;
    }
    // If email & password is incorrect.
    if (foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        { text: 'Okay' },
      ]);
      return;
    }
    signIn(foundUser);
  };

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
            placeholder="Your Email"
            onChangeText={(text) => emailChange(text)}></TextInput>
          {data.checkEmailChange ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>
        {data.notValidEmail ? null : (
          <Text style={styles.errorMessage}>Email Syntax is not Correct</Text>
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
            onPress={() => {
              sendSignInCredentials(data.email, data.password);
            }}
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
            style={[styles.button, { backgroundColor: '#E0EFF6' }]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#009387',
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
    marginLeft: '38%',
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