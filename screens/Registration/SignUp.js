import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ToastAndroid, Image, } from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Feather } from 'react-native-vector-icons';
import axios from "axios";

import logo from "../images/IFLA.png";

import { REST_API_LOCAL } from "@env";

const SignUp = ({ route, navigation }) => {
  // const { setloggedin } = route.params;

  const [data, setData] = React.useState({
    email: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    checkEmailChange: false,
    checkPasswordChange: false,
    checkConfirmPasswordChange: false,
    checkCompanyNameChange: false,
    validEmail: true,
    validPassword: true,
    validCompanyName: true,
    secureTextEntry: true,
  });

  const checkConditions = (condition1, condition2) => {
    if (condition1 && condition2) {
      return true;
    } else {
      return false;
    }
  };

  const postData = async () => {
    if (
      data.validEmail &&
      data.email &&
      data.validName &&
      data.validPassword &&
      data.password &&
      data.confirmPassword &&
      data.companyName &&
      data.validCompanyName
    ) {
      var body = {
        email: data.email,
        password: data.password,
        companyName: data.companyName,
        userRole: "Shipper",
        isAdmin: false,
      };
      console.log(body);
      let res = await axios.post(`${REST_API_LOCAL}/users/signup`, body);
      const data1 = await res.data;
      console.log(data1);
      if (data1) {
        showToastWithGravity("Signed up");
        // setloggedin(true)
        navigation.navigate("AccountConfiguration");
      } else showToastWithGravity("Couldn't Sign up");
      // navigation.goBack();
    } else {
      showToastWithGravity("Please Enter All Details Correctly");
    }
  };

  const showToastWithGravity = (text) => {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };


  const companyNameChange = (val) => {
    setData({
      ...data,
      companyName: val,
      checkCompanyNameChange: true,
      validCompanyName: true,
    });
  };

  const emailChange = (val) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(String(val).toLowerCase())) {
      setData({
        ...data,
        email: val,
        checkEmailChange: true,
        validEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        checkEmailChange: true,
        validEmail: false,
      });
    }
  };

  const passwordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        validPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        validPassword: false,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>

      <SafeAreaView style={styles.footer}>
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            Create an account
          </Text>
          <Text style={{ color: "#AAAAAA" }}>Book your first shipment</Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="envelope" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            onChangeText={(val) => emailChange(val)}
          ></TextInput>
          {checkConditions(data.checkEmailChange, data.validEmail) ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>
        {data.validEmail ? null : (
          <View duration={500}>
            <Text style={styles.errorMessage}>
              Email Syntax is not correct.
            </Text>
          </View>
        )}

        {/* Company Name */}
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Company Name"
            placeholderTextColor="#666666"
            onChangeText={(val) => companyNameChange(val)}
          ></TextInput>
        </View>
        {data.validCompanyName ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
              Company Name must be 2 characters long.
            </Text>
          </View>
        )}

        <View style={styles.action}>
          <Feather name="lock" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => passwordChange(val)}
          ></TextInput>

          <TouchableOpacity onPress={hideOrUnhideEye}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={25} />
            ) : (
              <Feather name="eye" color="grey" size={25} />
            )}
          </TouchableOpacity>
        </View>
        {data.validPassword ? null : (
          <View duration={500}>
            <Text style={styles.errorMessage}>
              Password must be at least 6 characters long.
            </Text>
          </View>
        )}

        <View style={styles.action}>
          <Feather name="lock" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Confrim Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => confirmPasswordChange(val)}
          ></TextInput>

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
            style={[styles.customTo, { backgroundColor: "#068E94" }]}
          >

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Octicons name="sign-out" size={18} color={'white'} />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "white",
                  },
                ]}
              >
                Sign Up
              </Text>
            </View>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignInScreen")}
            style={[styles.customTo, { backgroundColor: "white" }]}
          >

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Octicons name="sign-out" size={18} color={'black'} />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "black",
                  },
                ]}
              >
                Sign In
              </Text>
            </View>

          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#068E94",
  },
  header: {
    flex: 1,
    justifyContent: "center",

    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#E0EFF6",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  action: {
    flexDirection: "row",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    paddingBottom: 5,
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },
  ti: {
    flex: 1,
    paddingLeft: 12,
    color: "#05375a",
    fontSize: 15,
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 12,
  },
  logo: {
    alignSelf: "center",
    width: 150,
    height: 100,
  },
  customTo: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 15,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold", marginHorizontal: 5,
  },
});

export default SignUp;
