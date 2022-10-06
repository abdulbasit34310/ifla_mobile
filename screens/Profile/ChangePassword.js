import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import { REST_API_LOCAL } from "@env";

const ChangePassword = ({navigation}) => {
//   const [value, setValue] = useState(0);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePassword = async()=>{
    let token1 = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios.post(`${REST_API_LOCAL}/users/changepassword`, {
        oldpassword:password,password:newPassword},
        {withCredentials: true,
        headers: headers})
    console.log(response.data)
    // if(response.data=="Succesful")
    //     navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}>Change Password</Text>
      <View>
        <TextInput placeholder="Enter Old Password" style={styles.inputStyle}
            onChangeText={setPassword}
            secureTextEntry={true}/>
        <TextInput
          secureTextEntry={true}
          placeholder="Enter New Password"
          style={styles.inputStyle}
          onChangeText={setNewPassword}
        />
        {newPassword.length <= 7 ? 
            (<Text style={{color:"red"}}>Password must be at least 8 characters long </Text>):null}
        <TouchableOpacity style={{backgroundColor:"black", margin:"7%", padding:"3%", borderRadius:50}} onPress={()=>{updatePassword();}}>
            <Text style={{color:"white", alignSelf:"center"}}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },

  formLabel: {
    fontSize: 20,
    color: '#fff',
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
export default ChangePassword