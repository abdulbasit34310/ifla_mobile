import * as React from "react";
import { View, StyleSheet, Image, Alert, Button } from "react-native";
import Constants from "expo-constants";
import IFLA from "./images/IFLA.png";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../components/context";

const MainScreen = ({ route, navigation }) => {
  const [token, setToken] = React.useState();
  const { signOut } = React.useContext(AuthContext);
  function getValueFor() {
    let result = SecureStore.getItemAsync("userToken").then((val) =>
      setToken(val)
    );
    // console.log(result)
    // if (result)
    // // {
    //     setToken(result)
  }
  const deleteToken = () => {
    // SecureStore.deleteItemAsync("userToken");
    signOut();
  };

  const isTokenExpired = () => {
    if (token) {
      const expiry = JSON.parse(atob(token.split(".")[1])).exp;
      console.log(expiry);
      console.log(Math.floor(new Date().getTime() / 1000) >= expiry);
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    }
    return false;
  };

  // const request = ()=>{
  //     console.log(token)
  //     var obj = {
  //         method: 'POST',
  //         withCredentials: true,
  //         credentials: 'include',
  //         headers: {
  //             'Authorization': `Bearer ${token}`
  //         }
  //       }
  //     fetch('http://192.168.0.103:4000/users/testAuth', obj)
  //     .then(function(res) {
  //         return res.json();
  //     })
  //     .then(function(resJson) {
  //         console.log(resJson)
  //         return resJson;
  //     })
  // }
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getValueFor();
      // if (isTokenExpired()) deleteToken();
      // request()
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        style={{
          backgroundColor: "#00ABB2",
          width: 335,
          height: 275,
        }}
        source={IFLA}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#00ABB2",
    alignItems: "center",
  },
});
