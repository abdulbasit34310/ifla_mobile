import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Card, Divider, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, ActivityIndicator, Alert, Button, Dimensions, FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { REST_API_LOCAL } from "@env";

const ChangePassword = ({ navigation }) => {
  //   const [value, setValue] = useState(0);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePassword = async () => {
    let token1 = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios.post(
      `${REST_API_LOCAL}/users/changepassword`,
      {
        oldpassword: password,
        password: newPassword,
      },
      { withCredentials: true, headers: headers }
    );
    console.log(response.data);
    // if(response.data=="Succesful")
    //     navigation.goBack()
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 15 }}>
        <TouchableRipple style={{ width: '15%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
          navigation.goBack();
        }}>
          <Entypo name='chevron-small-left' size={34} />
        </TouchableRipple>
      </View>
      <View>
        <View style={styles.action}>
          <TextInput
            placeholder="Enter Old Password"
            style={styles.inputStyle}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter New Password"
            style={styles.inputStyle}
            onChangeText={setNewPassword}
          />
        </View>
        {newPassword.length <= 5 ? null : (
          <Text style={{ color: "red" }}>
            Password must be at least 6 characters long{" "}
          </Text>
        )}

        <TouchableOpacity
          style={[styles.customButton, { backgroundColor: "#068E94" }]}
          onPress={() => {
            updatePassword();
          }}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: "white",
              },
            ]}
          >Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0EFF6",
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  action: {
    flexDirection: "row",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    padding: 15,
    borderRadius: 6
  },
  customButton: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 20,
    marginBottom: '50%',
    elevation: 5,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 12,
    color: "#05375a",
    fontSize: 15,
  },
});
export default ChangePassword;
