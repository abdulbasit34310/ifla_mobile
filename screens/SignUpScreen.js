import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../components/context';
import logo from './images/Falas.png';

const FIREBASE_API_ENDPOINT =
  'https://madproject-61e88-default-rtdb.firebaseio.com/';

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    checkNameChange: false,
    checkEmailChange: false,
    checkPasswordChange: false,
    checkConfirmPasswordChange: false,
    notValidName: true,
    notValidEmail: true,
    notValidPassword: true,
    secureTextEntry: true,
  });

  const postData = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/userCredentials.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  // React.useEffect(() => {
  //   postData();
  // }, []);

  const nameChange = (val) => {
    if (val.trim().length != 2) {
      setData({
        ...data,
        name: val,
        checkNameChange: true,
        notValidName: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        checkNameChange: false,
        notValidName: false,
      });
    }
  };

  const emailChange = (val) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(String(val).toLowerCase())) {
      setData({
        ...data,
        email: val,
        checkEmailChange: true,
        notValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        checkEmailChange: false,
        notValidEmail: false,
      });
    }
  };

  const passwordChange = (val) => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        password: val,
        notValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        notValidPassword: false,
      });
    }
  };

  const confirmPasswordChange = (val) => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };

  const hideOrUnhideEye = () => {
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
          <FontAwesome name="user-o" color="#009387" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Name"
            onChangeText={(val) => nameChange(val)}></TextInput>
          {data.checkNameChange ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>
        {data.notValidName ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>Name must be 2 characters long.</Text>
          </View>
        )}

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

        {data.notValidEmail ? null : (
          <View duration={500}>
            <Text style={styles.errorMessage}>
              Email Syntax is not correct.
            </Text>
          </View>
        )}

        <View style={styles.action}>
          <FontAwesome name="lock" color="#009387" size={26} />
          <TextInput
            style={styles.ti}
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => passwordChange(val)}></TextInput>

          <TouchableOpacity onPress={hideOrUnhideEye}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={25} />
            ) : (
              <Feather name="eye" color="grey" size={25} />
            )}
          </TouchableOpacity>
        </View>
        {data.notValidPassword ? null : (
          <View duration={500}>
            <Text style={styles.errorMessage}>
              Password must be 8 characters long.
            </Text>
          </View>
        )}

        <View style={styles.action}>
          <FontAwesome name="lock" color="#009387" size={26} />
          <TextInput
            style={styles.ti}
            placeholder="Confrim Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => confirmPasswordChange(val)}></TextInput>

          <TouchableOpacity onPress={hideOrUnhideEye}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={25} />
            ) : (
              <Feather name="eye" color="grey" size={25} />
            )}
          </TouchableOpacity>
        </View>
        {data.confirmPassword == data.password ? null : (
          <View duration={500}>
            <Text style={styles.errorMessage}>
              Confirm Password is not equal to Password.
            </Text>
          </View>
        )}

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
            onPress={() => navigation.navigate('SignInScreen')}
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
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  logo: {
    marginLeft: '35%',
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  ti: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#009387',
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
    backgroundColor: '#009387',
  },
});

export default SignUpScreen;
