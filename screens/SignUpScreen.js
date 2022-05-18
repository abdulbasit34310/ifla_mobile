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
import Checkbox from 'expo-checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../components/context';
import logo from './images/Falas.png';

const FIREBASE_API_ENDPOINT =
  'https://madproject-61e88-default-rtdb.firebaseio.com/';

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    address: '',
    phoneNo: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    checkNameChange: false,
    checkEmailChange: false,
    checkAddressChange: false,
    checkPhoneNoChange: false,
    checkPasswordChange: false,
    checkConfirmPasswordChange: false,
    checkCompanyNameChange: false,
    notValidName: true,
    notValidEmail: true,
    notValidAddress: true,
    notValidPhoneNo: true,
    notValidPassword: true,
    notValidCompanyName: true,
    secureTextEntry: true,

  });

  const [isChecked, setChecked] = React.useState(false);

  const postData = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        address: data.address,
        phoneNo: data.phoneNo,
        password: data.password,
        companyName: data.companyName,
      }),
    };
    fetch(`${FIREBASE_API_ENDPOINT}/userCredentials.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    navigation.goBack();
  };

  const addressChange = (text) => {
    if (text.trim().length > 1) {
      setData({
        ...data,
        address: text,
        checkAddressChange: true,
        notValidAddress: true,
      })
    } else {
      setData({
        ...data,
        address: text,
        checkAddressChange: false,
        notValidAddress: false,
      })
    }
  }

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

  const companyNameChange = (val) => {
    if (val.trim().length != 2) {
      setData({
        ...data,
        companyName: val,
        checkCompanyNameChange: true,
        notValidCompanyName: true,
      });
    } else {
      setData({
        ...data,
        companyName: val,
        checkCompanyNameChange: false,
        notValidCompanyName: false,
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
  const phoneNoChange = (val) => {
    const reg = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    if (reg.test(String(val))) {
      setData({
        ...data,
        phoneNo: val,
        checkPhoneNoChange: true,
        notValidPhoneNo: true,
      })
    } else {
      setData({
        ...data,
        phoneNo: val,
        checkPhoneNoChange: false,
        notValidPhoneNo: false,
      })
    }
  }

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

      {/* Name */}

      <View style={styles.action}>
        <FontAwesome name="user-o" color="#068E94" size={25} />
        <TextInput
          style={styles.ti}
          placeholder="Your Name"
          placeholderTextColor="#666666"
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

      {/* Email */}

      <View style={styles.action}>
        <FontAwesome name="envelope-o" color="#068E94" size={25} />
        <TextInput
          style={styles.ti}
          placeholder="Your Email"
          placeholderTextColor="#666666"
          keyboardType="email-address"
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

      {/* Address */}

      <View style={styles.action}>
        <Icon name="map-marker-radius" color="#068E94" size={25} />
        <TextInput
          style={styles.ti}
          placeholder='Your Address'
          placeholderTextColor="#666666"
          autoCorrect={false}
          onChangeText={(text) => addressChange(text)}
        />
      </View>
      {data.notValidAddress ? null : (
        <View duration={500}>
          <Text style={styles.errorMessage}>
            Enter some Address.
          </Text>
        </View>
      )}

      {/* Phone Number */}

      <View style={styles.action}>
        <Feather name="phone" color="#068E94" size={25} />
        <TextInput
          style={styles.ti}
          placeholder="Phone Number"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          onChangeText={(text) => phoneNoChange(text)}
        ></TextInput>
      </View>
      {data.notValidPhoneNo ? null : (
        <View duration={500}>
          <Text style={styles.errorMessage}>
            Phone Number is not Valid.
          </Text>
        </View>
      )}

      <View style={styles.action}>
        <FontAwesome name="lock" color="#068E94" size={25} />
        <TextInput
          style={styles.ti}
          placeholder="Your Password"
          placeholderTextColor="#666666"
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
        <FontAwesome name="lock" color="#068E94" size={25} />
        <TextInput
          style={styles.ti}
          placeholder="Confrim Password"
          placeholderTextColor="#666666"
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

      <View style={styles.checkbox}>
        <Text>Are you a company owner?</Text>
        <Checkbox value={isChecked} onValueChange={setChecked} />
      </View>

      {/* Company Name */}

      {isChecked == false ? null : (
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#068E94" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Company Name"
            placeholderTextColor="#666666"
            onChangeText={(val) => companyNameChange(val)}>
          </TextInput>
        </View>
      )}

      {data.notValidCompanyName ? null : (
        <View duration={500}>
          <Text style={styles.errorMsg}>Company Name must be 2 characters long.</Text>
        </View>
      )}

      <View>
        <TouchableOpacity
          onPress={() => postData()}
          style={[styles.button, { backgroundColor: '#068E94' }]}>
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
                color: '#068E94',
              },
            ]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0EFF6',
    paddingHorizontal: 20,
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  checkbox: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  ti: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#068E94',
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
});

export default SignUpScreen;