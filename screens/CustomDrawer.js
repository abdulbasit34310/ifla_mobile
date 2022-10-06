import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Drawer, Title, Caption } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AB from "./images/AB.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import * as SecureStore from 'expo-secure-store';
import { AuthContext } from "../components/context";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { REST_API_LOCAL } from "@env";

export function CustomDrawer(props) {
  const { signOut } = React.useContext(AuthContext);
  const [image, setImage] = React.useState();
  const [user, setUser] = React.useState(null);

  const getUser = async () => {
    let token1 = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios.get(`${REST_API_LOCAL}/users/getUser`, {
      withCredentials: true,
      headers: headers,
    });

    const data = await response.data;
    console.log(data);
    setImage(data.personId.image);
    setUser(data.personId);
  };

  React.useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#E0EFF6" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {image ? (
                <Image
                  style={{
                    backgroundColor: "#00ABB2",
                    width: 100,
                    height: 100,
                    borderRadius: 90,
                  }}
                  source={{ uri: `${REST_API_LOCAL}/images/${image}` }}
                />
              ) : null}
              {user !== null ? (
                <View
                  style={{
                    marginLeft: 15,
                    marginTop: 30,
                    flexDirection: "column",
                  }}
                >
                  <Title style={styles.title}>{user.username}</Title>
                  <Caption style={styles.email}>{user.email}</Caption>
                </View>
              ) : null}
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("MainScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="map-marker-distance" color={color} size={size} />
              )}
              label="Tracking"
              onPress={() => {
                props.navigation.navigate("TrackingScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="truck-delivery-outline" color={color} size={size} />
              )}
              label="Booking"
              onPress={() => {
                props.navigation.navigate("Booking");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="credit-card" color={{ color }} size={size} />
              )}
              label="Wallet"
              onPress={() => {
                props.navigation.navigate("Wallet");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Logout"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  email: {
    fontSize: 13,
    lineHeight: 13,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
