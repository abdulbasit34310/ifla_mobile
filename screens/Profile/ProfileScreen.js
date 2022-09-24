import * as React from "react";
import { SafeAreaView, View, StyleSheet, Image } from "react-native";
import { Title, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
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
import AB from "../images/AB.png";
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
    <SafeAreaView style={styles.background}>
      <View style={{ paddingBottom: 5 }}>
        <View style={{ alignItems: "center", margin: 10 }}>
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
            <Title style={styles.titleStyle}>{getData.personId.name}</Title>
          </SafeAreaView>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        {/* Email */}

        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          {getData.personId.email !== "" ? (
            <Text style={{ color: "#777777" }}>{getData.personId.email}</Text>
          ) : (
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              Email Not Added
            </Text>
          )}
        </View>
      </View>

      <View style={{ marginTop: 50 }}>
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
            <Text style={styles.buttonTitle}>View Information</Text>
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
              <FontAwesome name="wallet" solid color="white" size={20} />
            </View>
            <Text style={styles.buttonTitle}>Wallet</Text>
          </View>
          <FontAwesome name="chevron-right" size={25} color="lightgrey" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => {
            navigation.navigate("CompanyInformationScreen", { item: getData });
          }}
        >
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

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 40,
            margin: 20,
            borderRadius: 10,
            backgroundColor: Theme.SecondaryBackground,
            width: 130,
          }}
          onPress={signOut}
        >
          <FontAwesome
            name="sign-out-alt"
            size={20}
            style={{ padding: 10 }}
            color={Theme.PrimaryText}
          />
          <Title style={{ color: Theme.PrimaryText, fontSize: 16 }}>
            Signout
          </Title>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Theme.WHITE,

    paddingTop: 20,
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBox: {
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // backgroundColor: Theme.SecondaryBackground,
    marginTop: 2,
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
  titleStyle: {
    fontWeight: "bold",
    color: "black",
    marginTop: 25,
    fontSize: 25,
  },
});
