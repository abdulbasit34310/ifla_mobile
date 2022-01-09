import * as React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput, Alert,
    Platform,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import logo from './images/Falas.png';

import { AuthContext } from '../components/context';

const SignInScreen = ({ navigation }) => {
  const signIn = React.useContext( AuthContext );

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
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
        <Text style={styles.title}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#009387" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Email"
            onChangeText={(val) => textInputChange(val)}></TextInput>
          {data.check_textInputChange ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>
        <Text style={styles.title}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#009387" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => handlePasswordChange(val)}></TextInput>
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={25} />
            ) : (
              <Feather name="eye" color="grey" size={25} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={{ color: '#009387', marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            onPress={() => {
              signIn(data.username, data.password);
            }}
            style={[styles.button, { backgroundColor: '#009387' }]}>
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
            style={[styles.button, { backgroundColor: '#f2f2f2' }]}>
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  // text_header: {
  //     color: '#fff',
  //     fontWeight: 'bold',
  //     fontSize: 30,
  // },
  // text_footer: {
  //     color: '#05375a',
  //     fontSize: 18,
  // },
  action: {
    flexDirection: 'row',
    marginTop: 10,
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
    color: '#05375a',
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

export default SignInScreen;
