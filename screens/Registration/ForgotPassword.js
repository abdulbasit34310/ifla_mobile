import * as React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";

import { MaterialCommunityIcons, FontAwesome, Octicons } from 'react-native-vector-icons';
import Feather from "react-native-vector-icons/Feather";
import { REST_API_LOCAL } from "@env";

import logo from '../../assets/IFLA.png';

import axios from "axios";

var arr = [];

const ForgotPassword = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    checkEmailChange: false,
    notValidEmail: true,
  });

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
  //  {withCredentials:true, headers: {"Authorization": `Bearer ${token1}`}}
  const forgotpassword = (email) => {
    axios.post(`${REST_API_LOCAL}/users/forgotpassword`, { email: email });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.action}>
          <FontAwesome name="user-circle" color="#005761" size={25} />
          <TextInput
            style={styles.ti}
            placeholder="Your Email"
            onChangeText={(email) => emailChange(email)}
          ></TextInput>
          {data.checkEmailChange ? (
            <Feather name="check-circle" color="green" size={25} />
          ) : null}
        </View>
        {data.notValidEmail ? null : (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMessage}>
              Email Syntax is not correct.
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.customButton, { backgroundColor: "#068E94" }]}
          onPress={() => {
            forgotpassword(data.email);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="lock-reset" size={18} color={'white'} />
            <Text
              style={[
                styles.buttonText,
                {
                  color: "white",
                },
              ]}
            >
              Reset Password
            </Text>
          </View>
        </TouchableOpacity>
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
    flex: 3,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logo: {
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
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 12,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#068E94",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
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
});

export default ForgotPassword;
