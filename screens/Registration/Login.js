import * as React from "react";
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";

import { AuthContext } from "../../components/context";
import IFLAlogo from "../../assets/IFLA.png";

import {
  GOOGLE_ID,
  GOOGLE_ID_IOS,
  GOOGLE_ID_EXPO,
  GOOGLE_ID_WEB,
  FB_APPID,
} from "@env";
WebBrowser.maybeCompleteAuthSession();
// import { REST_API_LOCAL } from "@env";
const REST_API_LOCAL="http://192.168.0.113:4000"


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

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_ID_EXPO,
    iosClientId: GOOGLE_ID_IOS,
    androidClientId: GOOGLE_ID,
    webClientId: GOOGLE_ID_WEB,
  });

  const [requestFb, responseFb, promptAsyncFb] = Facebook.useAuthRequest({
    clientId: FB_APPID,
  });

  React.useEffect(() => {
    if (responseFb?.type === "success") {
      const { authentication } = responseFb;
      console.log(authentication);
      setAccessToken(authentication.accessToken);

      fbGetUserData();
    }
  }, [responseFb]);

  async function fbGetUserData() {
    let userInfoResponse = await axios.get(
      "https://www.facebook.com/v6.0/dialog/oauth",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    setUserInfo(userInfoResponse.data);
  }

  const fbLoginToIfla = async (user) => {
    const response = await axios.post(`${REST_API_LOCAL}/users/googleMobile`, {
      user: user,
    });
    const data = response.data;
    const foundUser = { userToken: data.token, email: userInfo.email };
    console.log(foundUser);

    signIn(foundUser);

    if (data) {
      showToastWithGravity();
    }
  };


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

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authentication);
      setAccessToken(authentication.accessToken);
      getUserData();
      loginToIfla(userInfo);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
      console.log(data);
    });
  }

  const loginToIfla = async (user) => {
    const response = await axios.post(`${REST_API_LOCAL}/users/googleMobile`, {
      user: user,
    });
    const data = response.data;
    const foundUser = { userToken: data.token, email: userInfo.email };
    console.log(foundUser);

    signIn(foundUser);

    if (data) {
      showToastWithGravity();
    }
  };

  const sendSignInCredentials = async () => {
    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Email or Password field cannot be empty.",
        [{ text: "OK" }]
      );
      return;
    }

    console.log(data.email);

    // If Username & password is incorrect.
    const body = { email: data.email.trim().toLowerCase(), password: data.password };
    console.log(body);

    const response = await axios.post(`${REST_API_LOCAL}/users/login`, body)
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
          <Text style={styles.errorMessage}>Password must be of length 6</Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
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
                Login
              </Text>
            </View>
          </TouchableOpacity>
          {/* <Button
            disabled={!request}
            title="Login"
            onPress={() => {
              promptAsync({ useProxy: true, redirectUri :"https://auth.expo.io/@isala1/IFLA" });
            }}
          />
           <Button
              disabled={!request}
              title="Login"
              onPress={() => {
                promptAsyncFb();}}
            /> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
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
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
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
    height: 150,
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
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 12,
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
