import * as React from "react";
import { SafeAreaView, View, StyleSheet, Image } from "react-native";
import { Title, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../components/context";
import AB from "../images/AB.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { REST_API, REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";

const REST_API_ENDPOINT =
  "http://192.168.0.177:4000/users" || REST_API + "/users";

const FIREBASE_API_ENDPOINT =
  "https://madproject-61e88-default-rtdb.firebaseio.com/";

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
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios.get(`${REST_API_ENDPOINT}/getUser`, {
      withCredentials: true,
      headers: headers,
    });

    // const response = await fetch(
    //     `${FIREBASE_API_ENDPOINT}/userCredentials.json`
    // );
    const data = await response.data;
    console.log(data);
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
      <View style={{ paddingBottom: 25 }}>
        <View style={{ alignItems: "center", margin: 10 }}>
          {getData.personId.image ? (
            <Image
              style={{ width: 150, height: 150, borderRadius: 100 }}
              source={{
                uri: `http://192.168.0.177:4000/images/${getData.personId.image}`,
              }}
            />
          ) : null}
          <SafeAreaView>
            <Title style={{ fontWeight: "bold", marginTop: 25, fontSize: 25 }}>
              {getData.personId.name}
            </Title>
          </SafeAreaView>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        {/* Email */}

        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {getData.personId.email}
          </Text>
        </View>

        {/* Address */}
        {getData.addresses[0] ? (
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {getData.addresses[0].city}
            </Text>
          </View>
        ) : null}

        {/* Phone Number */}

        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {getData.personId.phone}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => {
            navigation.navigate("EditProfileScreen", { item: getData });
          }}
        >
          <Text
            style={[
              styles.title,
              { fontSize: 13, color: "#E0EFF6", padding: 10 },
            ]}
          >
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => {
            navigation.navigate("CompanyInformationScreen");
          }}
        >
          <Text
            style={[
              styles.title,
              { fontSize: 13, color: "#E0EFF6", padding: 10 },
            ]}
          >
            Company Information
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignSelf: "center" }} onPress={signOut}>
          <Title style={{ color: "#005761" }}>Logout</Title>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#E0EFF6",
    padding: 25,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  infoBox: {
    borderRadius: 10,
    backgroundColor: "#00ABB2",
    margin: 10,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 5, width: 5 }, // IOS
    shadowOpacity: 44, // IOS
    shadowRadius: 5, //IOS
    elevation: 24,

    alignItems: "center",
  },
});
