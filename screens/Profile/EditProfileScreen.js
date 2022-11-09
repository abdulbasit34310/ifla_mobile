import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";

const EditProfileScreen = ({ navigation, route }) => {
  var item = route.params.item;
  const [hasGalleyPermission, setHasGalleryPermission] = React.useState(null);
  const [image, setImage] = React.useState();

  const [data, setData] = React.useState({
    key: item.key,
    name: item.personId.name,
    email: item.personId.email,
    username: item.personId.username,
    cnic: item.personId.cnic,
    phoneNo: item.personId.phone,

    checkNameChange: false,
    checkEmailChange: false,
    checkUsernameChange: false,
    checkPhoneNoChange: false,
    checkCnicChange: false,

    validName: true,
    validEmail: true,
    validUsername: true,
    validPhoneNo: true,
    validCnic: true,
  });

  const updateData = async () => {
    // const id = key;
    try {
      if (
        data.validName &&
        data.validUsername &&
        data.validPhoneNo &&
        data.validEmail &&
        data.validCnic
      ) {
        const objToSave = {
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phoneNo,
          cnic: data.cnic,
        };
        let formData = new FormData();
        console.log(objToSave);
        //Adding files to the formdata
        formData.append("image", {
          name: "r76fhtt.jpg",
          uri: image,
          type: "image/jpg",
        });
        let token1 = await SecureStore.getItemAsync("userToken");

        const [res1, res2] = await Promise.all([
          axios.patch(`${REST_API_LOCAL}/users/update`, objToSave, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token1}` },
          }),
          axios.post(`${REST_API_LOCAL}/users/uploadImage`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token1}`,
            },
          }),
        ]).catch((error) => {
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
        console.log(res1.data);
        console.log(res2.data);
        ToastAndroid.showWithGravity(
          "Profile Updated",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        navigation.goBack();
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

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const nameChange = (val) => {
    setData({
      ...data,
      name: val,
      checkNameChange: true,
      ValidName: true,
    });
  };

  const cnicChange = (val) => {
    var reg = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
    if (reg.test(String(val))) {
      setData({
        ...data,
        cnic: val,
        checkCnicChange: true,
        validCnic: true,
      });
    } else {
      setData({
        ...data,
        cnic: val,
        checkCnicChange: true,
        validCnic: false,
      });
    }
  };
  const usernameChange = (val) => {
    if (val.length > 5) {
      setData({
        ...data,
        username: val,
        checkUserNameChange: true,
        validUserName: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        checkUserNameChange: true,
        validUserName: false,
      });
    }
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
        checkEmailChange: false,
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
        checkPhoneNoChange: false,
        validPhoneNo: false,
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      // var data = fs.readFileSync(result.uri);
      // const base64String = Buffer.from(data).toString("base64");
      // setImage64(base64String);
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ paddingTop: 20, alignItems: "center" }}>
          <TouchableOpacity onPress={() => pickImage()}>
            <View
              style={{
                width: 150,
                height: 150,
                position: "relative",
              }}
            >
              {!image && (
                <ImageBackground
                  source={{ uri: `data:image;base64,${item.personId.image}` }}
                  style={{ height: 125, width: 125 }}
                  imageStyle={{ borderRadius: 90 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!image && (
                      <Icon
                        name="camera-outline"
                        size={35}
                        color="grey"
                        style={{
                          opacity: 0.5,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1,
                          padding: 30,
                          borderColor: "grey",
                          borderRadius: 50,
                        }}
                      />
                    )}
                  </View>
                </ImageBackground>
              )}
              {image && (
                <ImageBackground
                  source={{ uri: image }}
                  style={{ height: 125, width: 125 }}
                  imageStyle={{ borderRadius: 90 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera-outline"
                      size={35}
                      color="grey"
                      style={{
                        opacity: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        padding: 30,
                        borderColor: "grey",
                        borderRadius: 50,
                      }}
                    />
                  </View>
                </ImageBackground>
              )}

              <FontAwesomeIcon
                name="plus"
                size={25}
                color="grey"
                style={{
                  top: 3,
                  right: 10,
                  opacity: 0.5,
                  position: "absolute",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoSection}>
          {/* Full Name */}

          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="account" color="#666666" size={20} />
            <Title style={styles.titleStyle}>Full Name</Title>
          </View>
          <TextInput
            style={styles.textInputStyle}
            value={data.name}
            onChangeText={nameChange}
          ></TextInput>

          {/* Email */}

          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="email" color="#666666" size={20} />
            <Title style={styles.titleStyle}>Email</Title>
          </View>
          <TextInput
            style={styles.textInputStyle}
            value={data.email}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={emailChange}
          />
          {!data.validEmail && (
            <Text style={styles.errorText}>Wrong Email Format</Text>
          )}
          {/* Username */}

          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="account-circle" color="#666666" size={20} />
            <Title style={styles.titleStyle}>Username</Title>
          </View>
          <TextInput
            style={styles.textInputStyle}
            value={data.username}
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={usernameChange}
          />
          {!data.validUsername && (
            <Text style={styles.errorText}>Wrong Username Format</Text>
          )}

          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon name="id-card" color="#666666" size={20} />
            <Title style={styles.titleStyle}>CNIC</Title>
          </View>
          <TextInput
            placeholderTextColor="#666666"
            value={data.cnic}
            keyboardType="number-pad"
            autoCorrect={false}
            style={styles.textInputStyle}
            onChangeText={cnicChange}
          />
          {!data.validCnic && (
            <Text style={styles.errorText}>Wrong CNIC Format</Text>
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
        </View>
        {!data.validPhoneNo && (
          <Text style={styles.errorText}>Wrong Phone No Format</Text>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={updateData}>
          <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
            Update
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
            Change Password
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0EFF6",
    flex: 1,
    padding: 20,
  },
  userInfoSection: {
    marginTop: 10,
    justifyContent: "center",
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
  },
  submitButton: {
    borderRadius: 14,
    backgroundColor: "#00ABB2",
    color: "white",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 45,
    width: "60%",
    height: 50,
    elevation: 5,
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
