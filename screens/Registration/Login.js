import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Platform,
  ToastAndroid,
  ScrollView,
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Octicons,
  Feather,
} from "react-native-vector-icons";
import { AuthContext } from "../../components/context";
import axios from "axios";

// import * as SecureStore from 'expo-secure-store';

import IFLAlogo from "../../assets/IFLA.png";

// import { REST_API_LOCAL } from "@env";
const REST_API_LOCAL = "http://192.168.0.114:4000";
const Login = ({ route, navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    checkemailChange: false,
    checkPasswordChange: false,
    notValidemail: true,
    notValidPassword: true,
    secureTextEntry: true,
  });

  const { signIn } = React.useContext(AuthContext);

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
    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty.",
        [{ text: "OK" }]
      );
      return;
    }
    console.log(data.email);
    // If Username & password is incorrect.
    const body = { email: data.email, password: data.password };
    console.log(body);
    const response = await axios
      .post(`${REST_API_LOCAL}/users/login`, body)
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          Alert.alert("Invalid User!", "Email or password is incorrect.", [
            { text: "OK" },
          ]);
          return;
        }
      });

    const data1 = await response.data;
    const token = data1.token;
    const email = data1.user.email;
    const foundUser = { userToken: token, email: email };
    console.log(foundUser);

    signIn(foundUser);

    if (data1) {
      showToastWithGravity();
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
    if (text.length >= 6) {
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
        <Image source={IFLAlogo} style={styles.IFLAlogo} />
      </View>

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
            Welcome to IFLA!
          </Text>
          <Text style={{ color: "#AAAAAA" }}>Login to continue</Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-circle" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Email"
            onChangeText={(text) => emailChange(text)}
          ></TextInput>
          {data.checkemailChange ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>

        {data.notValidemail ? null : (
          <Text style={styles.errorMessage}>Email Syntax is not Correct</Text>
        )}

        <View style={styles.action}>
          <Feather name="lock" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(text) => passwordChange(text)}
          ></TextInput>
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
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text
            style={{
              color: "#009387",
              marginTop: 15,
              fontSize: 14,
              alignSelf: "center",
              marginBottom: 9,
            }}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            onPress={() => sendSignInCredentials()}
            style={[styles.button, { backgroundColor: "#068E94" }]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="sign-out" size={18} color={"white"} />
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "white",
                  },
                ]}
              >
                Login
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={[styles.button, { backgroundColor: "white" }]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="sign-out" size={18} color={"black"} />
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "black",
                  },
                ]}
              >
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 2,
    backgroundColor: "#E0EFF6",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  IFLAlogo: {
    alignSelf: "center",
    width: 175,
    height: 125,
  },
  action: {
    flexDirection: "row",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    paddingBottom: 5,
  },
  ti: {
    flex: 1,
    paddingLeft: 12,
    color: "#05375a",
    fontSize: 15,
    // borderBottomColor: '#777777',
    // borderBottomWidth: 1
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 12,
  },
  button: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 15,
    elevation: 3,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#068E94",
  },
});

// Buttons and Primary Foreground: #068E94
// Secondary Foreground: #00ABB2
// Background Primary and Text: #005761
// Background Secondary: #E0EFF6

export default Login;
