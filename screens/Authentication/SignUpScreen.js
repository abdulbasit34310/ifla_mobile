import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  ToastAndroid,
  Image,
} from "react-native";
import Checkbox from "expo-checkbox";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { REST_API, REST_API_LOCAL } from "@env";
import logo from "../images/IFLA.png";

const REST_API_ENDPOINT =
  "http://192.168.0.103:4000/users" || REST_API + "/users";

const SignUpScreen = ({ route, navigation }) => {
  // const { setloggedin } = route.params;

  const [data, setData] = React.useState({
    name: "",
    email: "",
    phoneNo: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    checkNameChange: false,
    checkEmailChange: false,
    checkPhoneNoChange: false,
    checkPasswordChange: false,
    checkConfirmPasswordChange: false,
    checkCompanyNameChange: false,
    validName: true,
    validEmail: true,
    validPhoneNo: true,
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
      data.name &&
      data.validName &&
      data.validPassword &&
      data.password &&
      data.validPhoneNo &&
      data.phoneNo &&
      data.confirmPassword &&
      data.companyName &&
      data.validCompanyName
    ) {
      var body = {
        username: data.name,
        email: data.email,
        phone: data.phoneNo,
        password: data.password,
        companyName: data.companyName,
        userRole: "Shipper",
        isAdmin: false,
      };
      console.log(body);
      let res = await axios.post(`${REST_API_ENDPOINT}/signup`, body);
      const data1 = await res.data;
      console.log(data1);
      if (data1) {
        showToastWithGravity("Signed up");
        // setloggedin(true)
        navigation.navigate("SignInScreen");
      } else showToastWithGravity("Couldn't Sign up");
      // navigation.goBack();
    } else {
      showToastWithGravity("Please Enter All Details Correctly");
    }
  };

  const showToastWithGravity = (text) => {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const nameChange = (val) => {
    if (val.length >= 6) {
      setData({
        ...data,
        name: val,
        checkNameChange: true,
        validName: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        checkNameChange: true,
        validName: false,
      });
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
  const phoneNoChange = (val) => {
    const reg =
      /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    if (reg.test(String(val))) {
      setData({
        ...data,
        phoneNo: val,
        checkPhoneNoChange: true,
        validPhoneNo: true,
      });
    } else {
      setData({
        ...data,
        phoneNo: val,
        checkPhoneNoChange: true,
        validPhoneNo: false,
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>
      {/* Username */}
      <View style={styles.footer}>
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
          <FontAwesome name="user-circle" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Userame"
            placeholderTextColor="#666666"
            onChangeText={(val) => nameChange(val)}
          ></TextInput>
          {checkConditions(data.checkNameChange, data.validName) ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>
        {data.validName ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
              User Name must be 6 characters long.
            </Text>
          </View>
        )}
        {/* Email */}
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
        {/* Phone Number */}
        <View style={styles.action}>
          <Feather name="phone" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Phone Number"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            onChangeText={(text) => phoneNoChange(text)}
          ></TextInput>
        </View>
        {data.validPhoneNo ? null : (
          <View duration={500}>
            <Text style={styles.errorMessage}>Phone Number is not Valid.</Text>
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
            style={[styles.button, { backgroundColor: "#068E94" }]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "white",
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignInScreen")}
            style={[styles.button, { backgroundColor: "white" }]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "black",
                },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  button: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 15,
    elevation: 5,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
