import * as React from "react";
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Checkbox from "expo-checkbox";
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import axios from "axios";

import IFLAlogo from "../../assets/IFLA.png";

import { REST_API_LOCAL } from "@env";

const SignUp = ({ route, navigation }) => {

  const [getData1, setData1] = React.useState({});

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
      data.email &&
      data.companyName &&
      data.password &&
      data.confirmPassword &&
      data.validEmail &&
      data.validCompanyName &&
      data.validPassword
    ) {
      var obj = {
        email: data.email.toLowerCase(),
        password: data.password,
        companyName: data.companyName,
        userRole: "Shipper",
        isAdmin: false
      };

      console.log("Sign Up Body")
      console.log(obj);

      let response1 = await axios.post(`${REST_API_LOCAL}/users/signup`, obj);
      const recievedData1 = await response1.data;

      console.log("Signed Up Data")
      console.log(recievedData1);

      if (recievedData1) {
        showToastWithGravity("Signed up");
      } else showToastWithGravity("Couldn't Sign up");
    } else {
      showToastWithGravity("Please Enter All Details Correctly");
    }
    navigation.navigate("AccountConfiguration", { item: obj })

  };

  const showToastWithGravity = (text) => {
    if (Platform.OS == 'android') {
      ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
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
        <Animatable.Image
          animation="lightSpeedIn"
          duraton="1500" source={IFLAlogo} style={styles.IFLAlogo} />
      </View>

      <Animatable.View
        animation="fadeInUpBig" style={styles.footer}>
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
            style={[styles.customButton, { backgroundColor: "#068E94" }]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="sign-out" size={18} color={"white"} />
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
            onPress={() => navigation.navigate("Login")}
            style={[styles.customButton, { backgroundColor: "white" }]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="sign-out" size={18} color={"black"} />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "black",
                  },
                ]}
              >
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
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
  IFLAlogo: {
    alignSelf: "center",
    width: 175,
    height: 150,
  },
  customButton: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 15,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
});

export default SignUp;