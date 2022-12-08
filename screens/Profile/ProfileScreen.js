import * as React from "react";
import { View, StyleSheet, Image, ScrollView, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Divider, Title, TouchableRipple } from "react-native-paper";
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import Avatar from "../../assets/Avatar.png";
import { AuthContext } from "../../components/context";

// import { REST_API_LOCAL } from "@env";
const REST_API_LOCAL = "http://192.168.0.113:4000";

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

const ProfileScreen = ({ route, navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  const [getData, setData] = React.useState(route.params.user);

  const getSignedInUserCredentials = async () => {
    let token = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${REST_API_LOCAL}/users/getUser`, {
      withCredentials: true,
      headers: headers,
    });
    const data = await response.data;
    setData(data);
  };

  const disableAccount = async ()=>{
    let token = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${REST_API_LOCAL}/shipper/disable`, {
      withCredentials: true,
      headers: headers,
    });
    signOut()
  }

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getSignedInUserCredentials();
    });
  }, [navigation]);

  return (
    <ScrollView>
    <View style={styles.container}>

      <View>
        <TouchableRipple style={{ width: '12%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
          navigation.goBack();
        }}>
          <Entypo name='chevron-small-left' size={34} />
        </TouchableRipple>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
            <Text style={{ color: "#777777", alignItems: 'center', fontSize: 16 }}>{getData.personId.email}</Text>
          ) : (
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              Email Not Added
            </Text>
          )}
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
            onPress={() => {
              navigation.navigate("Payments", 
             { screen: 'Wallet',
              initial: false,
              params:{user: getData}
            });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={[styles.iconView, { backgroundColor: "#FF7F50" }]}>
                <MaterialCommunityIcons
                  name="credit-card"
                  color={"white"}
                  size={24}
                />
              </View>
              <Text style={styles.buttonTitle}>Wallet</Text>
            </View>
            <Text style={styles.buttonTitle}>Wallet</Text>
          </View>
          <FontAwesome name="chevron-right" size={25} color="lightgrey" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => {
            navigation.navigate("CompanyInformationScreen", {
              item: getData,
            });
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
              <FontAwesome
                name="address-book"
                solid
                color="white"
                size={20}
              />
            </View>
            <Text style={styles.buttonTitle}>Addresses</Text>
          </View>
          <FontAwesome name="chevron-right" size={25} color="lightgrey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => {
            navigation.navigate("Insurance", { item: getData });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={[styles.iconView, { backgroundColor: "#FF6666" }]}>
              <MaterialCommunityIcons
                name="shield-sun-outline"
                solid
                color="white"
                size={24}
              />
            </View>
            <Text style={styles.buttonTitle}>Insurance</Text>
          </View>
          <FontAwesome name="chevron-right" size={25} color="lightgrey" />
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            style={[styles.customButton, { backgroundColor: "#068E94" }]}
            onPress={signOut}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="exit-to-app"
                color={"white"}
                size={24}
              />
              <Title style={styles.buttonText}>Sign Out</Title>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.customButton, { backgroundColor: "#ef4436" }]} onPress={disableAccount}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="close"
                color={"white"}
                size={24}
              />
              <Title style={styles.buttonText}>Disable Account</Title>
            </View>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0EFF6",
    padding: 20,
    flex: 1,
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
    borderBottomColor: "#AAAAAA",
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
    fontSize: 26,
  },
  customButton: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 20,
    marginBottom: '2%',
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "white",
  },
});
