import * as React from "react";
import { View, StyleSheet, Image, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { Title, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Feather } from 'react-native-vector-icons';

const Theme = {
  Buttons: "#068E94",
  PrimaryForeground: "#068E94",
  SecondaryForeground: "#00ABB2",
  PrimaryBackground: "#005761",
  SecondaryBackground: "#E0EFF6",
  PrimaryText: "#005761",
  BLACK: "#00000",
  WHITE: "#FFFFFF",
};

import { AuthContext } from "../../components/context";

import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Avatar from "../../assets/Avatar.png";
import * as SecureStore from "expo-secure-store";
import { REST_API_LOCAL } from "@env";

const ProfileScreen = ({ route, navigation }) => {
  var email = "";
  const { signOut } = React.useContext(AuthContext);
  const [getData, setData] = React.useState({
    key: " ",
    personId: { name: "", email: "", phone: "" },
    addresses: [{ City: "" }, { City: "" }],
  });
  //const [token,setToken] = React.useState(route.params.token)

  const getSignedInUserCredentials = async () => {
    let token1 = await SecureStore.getItemAsync("userToken");
    // console.log(token1);
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios.get(`${REST_API_LOCAL}/users/getUser`, {
      withCredentials: true,
      headers: headers,
    });

    // const response = await fetch(
    //     `${FIREBASE_API_LOCAL}/users/userCredentials.json`
    // );
    const data = await response.data;
    // console.log(data);
    setData(data);
    // var keyValues = Object.keys(data);

    // let credential = {};

    // for (let i = 0; i < keyValues.length; i++) {
    //     let key = keyValues[i];
    //     if (data[key].email == email) {
    //         credential = {
    //             keyId: key,
    //             name: data[key].name,
    //             email: data[key].email,
    //             address: data[key].address,
    //             phoneNo: data[key].phoneNo
    //         };
    //         setData(credential)
    //         break;
    //     }
    // }
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getSignedInUserCredentials();
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>

      <View>
        <View style={{ alignItems: "center" }}>
          {getData.personId.image ? (
            <Image
              style={{ width: 100, height: 100, borderRadius: 100 }}
              source={{ uri: `data:image;base64,${getData.personId.image}` }}
            />
          ) : (
            <Image
              style={{ width: 100, height: 100, borderRadius: 100 }}
              source={Avatar}
            />
          )}

          <SafeAreaView>
            <Title style={styles.nameTitle}>{getData.personId.name}</Title>
          </SafeAreaView>

          <View>
            {getData.personId.email !== "" ? (
              <Text style={{ color: "#777777" }}>{getData.personId.email}</Text>
            ) : (
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                Email Not Added
              </Text>
            )}
          </View>

        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => {
            navigation.navigate("EditProfileScreen", { item: getData });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={[styles.iconView, { backgroundColor: "#50C878" }]}>
              <FontAwesome name="id-card" solid color="white" size={20} />
            </View>
            <Text style={styles.buttonTitle}>Edit Profile</Text>
          </View>
          <FontAwesome name="chevron-right" size={25} color="lightgrey" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoBox}
        // onPress={() => {
        //   navigation.navigate("CompanyInformationScreen", { item: getData });
        // }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={[styles.iconView, { backgroundColor: "#FF7F50" }]}>
              <MaterialCommunityIcons name="credit-card" color={'white'} size={24} />
            </View>
            <Text style={styles.buttonTitle}>Wallet</Text>
          </View>
          <FontAwesome name="chevron-right" size={25} color="lightgrey" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoBox} onPress={() => { navigation.navigate("CompanyInformationScreen", { item: getData }); }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={[styles.iconView, { backgroundColor: "#6082B6" }]}>
              <FontAwesome name="building" solid color="white" size={20} />
            </View>
            <Text style={styles.buttonTitle}>Company Information</Text>
          </View>
          <FontAwesome name="chevron-right" size={25} color="lightgrey" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => {
            navigation.navigate("Addresses", { item: getData });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={[styles.iconView, { backgroundColor: "#F88379" }]}>
              <FontAwesome name="address-book" solid color="white" size={20} />
            </View>
            <Text style={styles.buttonTitle}>Addresses</Text>
          </View>
          <FontAwesome name="chevron-right" size={25} color="lightgrey" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.customButton} onPress={signOut} >
          <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
            <MaterialCommunityIcons name="exit-to-app" color={'white'} size={24} />
            <Title style={styles.buttonText}>
              Signout
            </Title></View>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.WHITE,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoBox: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 5,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  iconView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "teal",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  buttonTitle: {
    fontSize: 18,
    color: "grey",
    paddingLeft: 10,
  },
  nameTitle: {
    fontWeight: "bold",
    color: "black",
    fontSize: 26,
  },
  customButton: {
    backgroundColor: Theme.SecondaryForeground,
    padding: 5,
    borderRadius: 14,
    elevation: 3,
    width: "25%",
    height: 50,
    alignSelf: "center",
    margin: 10,
    
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: 'white',
  },
});
