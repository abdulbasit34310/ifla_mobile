import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Constants from "expo-constants";
import { Avatar, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Company from "../../assets/Company.jpg";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
// import { REST_API_LOCAL } from "@env";
const REST_API_LOCAL = "http://192.168.0.112:4000";

const CompanyInformationScreen = ({ navigation, route }) => {
  var item = route.params.item;
  const companyId = item.company._id;
  // var item = {
  //   company: {
  //     name: "Shehroz",
  //     email: "Email",
  //     ntn: "Ntn",
  //     phone: "03020302300",
  //     industry: "anca",
  //     country: "Pakistan",
  //   },
  // };
  const [data, setData] = React.useState({
    key: item.key,
    name: item.company.name,
    email: item.company.email,
    ntn: item.company.ntn,
    phoneNo: item.company.phone,
    industry: item.company.industry,
    country: item.company.country,

    checkNameChange: false,
    checkEmailChange: false,
    checkPhoneNoChange: false,
    checkNtnChange: false,
    checkIndustryChange: false,

    validName: true,
    validPhoneNo: true,
    validNtn: true,
    validIndustry: true,
  });

  const updateData = async () => {
    try {
      if (data.validNtn && data.validPhoneNo) {
        const objToSave = {
          name: data.name,
          ntn: data.ntn,
          phone: data.phoneNo,
          country: data.country,
          industry: data.industry,
        };

        let token1 = await SecureStore.getItemAsync("userToken");
        const headers = { Authorization: `Bearer ${token1}` };
        const response = await axios
          .put(
            `${REST_API_LOCAL}/shipper/update/company/${companyId}`,
            objToSave,
            {
              withCredentials: true,
              headers: headers,
            }
          )
          .catch((error) => {
            if (error.response) {
              // The request was made and the server responded with a status code
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              ToastAndroid.showWithGravity(
                "Error Occured",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
        console.log(response.data);
        ToastAndroid.showWithGravity(
          "Company Updated",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        // navigation.goBack();
      } else {
        ToastAndroid.showWithGravity(
          "Not Valid Format",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nameChange = (val) => {
    setData({
      ...data,
      name: val,
      checkNameChange: true,
      ValidName: true,
    });
  };

  const industryChange = (val) => {
    setData({
      ...data,
      industry: val,
      checkIndstryChange: true,
      ValidIndustry: true,
    });
  };
  const countryChange = (val) => {
    setData({
      ...data,
      country: val,
      checkCountryChange: true,
      ValidCountry: true,
    });
  };
  const ntnChange = (val) => {
    var reg = /^\d{7}$/;
    if (reg.test(String(val))) {
      setData({
        ...data,
        ntn: val,
        checkNtnChange: true,
        validNtn: true,
      });
    } else {
      setData({
        ...data,
        ntn: val,
        checkNtnChange: true,
        validNtn: false,
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

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: 200,
            height: 175,
            alignSelf: "center",
            borderRadius: 5,
          }}
          source={Company}
        />
      </View>
      <View style={styles.userInfoSection}>
        {/* Full Name */}
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Icon name="account" color="#666666" size={20} />
          <Title style={styles.titleStyle}>Company Name</Title>
        </View>
        <TextInput
          style={styles.textInputStyle}
          value={data.name}
          onChangeText={nameChange}
        ></TextInput>

        {/* Username */}

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Icon name="id-card" color="#666666" size={20} />
          <Title style={styles.titleStyle}>NTN number</Title>
        </View>
        <TextInput
          placeholderTextColor="#666666"
          value={data.ntn}
          keyboardType="number-pad"
          autoCorrect={false}
          style={styles.textInputStyle}
          onChangeText={ntnChange}
        />
        {!data.validNtn && (
          <Text style={styles.errorText}>Wrong Ntn Format</Text>
        )}

        {/* Phone Number */}

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Icon name="cellphone" color="#666666" size={20} />
          <Title style={styles.titleStyle}>Phone Number</Title>
        </View>

        <TextInput
          value={data.phoneNo}
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          style={styles.textInputStyle}
          onChangeText={phoneNoChange}
        />

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Icon name="cellphone" color="#666666" size={20} />
          <Title style={styles.titleStyle}>Industry</Title>
        </View>

        <TextInput
          value={data.industry}
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInputStyle}
          onChangeText={industryChange}
        />

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Icon name="cellphone" color="#666666" size={20} />
          <Title style={styles.titleStyle}>Country</Title>
        </View>

        <TextInput
          value={data.country}
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInputStyle}
          onChangeText={countryChange}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={updateData}>
        <Text style={{ fontSize: 18, color: "white" }}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompanyInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 15,
  },
  heading: {
    color: "grey",
    marginTop: 15,
    paddingLeft: 10,
  },
  titleStyle: {
    color: "#666666",
    fontSize: 15,
    marginLeft: 4,
  },
  textInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    fontSize: 20,
    paddingBottom: 10,
    width: "100%",
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#00ABB2",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 25,
    width: "60%",
    height: 50,
    elevation: 9,
  },
  userInfoSection: {
    padding: 10,
  },
  action: {
    flexDirection: "row",
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: 10,
  },
});
