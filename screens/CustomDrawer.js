import * as React from "react";
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Drawer, Title, Caption } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
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
            <View style={{ marginTop: 20 }}>
              {image ? (
                <Image
                  style={{
                    backgroundColor: "#00ABB2",
                    width: 100,
                    height: 100,
                    borderRadius: 90,
                  }}
                  source={{ uri: `data:image;base64,${image}` }}
                />
              ) : null}
              {user !== null ? (
                <Caption style={styles.emailStyle}>{user.email}</Caption>
              ) : null}
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons
                  name="home"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("MainScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome
                  name="user-circle"
                  color={color}
                  size={size}
                />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("ProfileStack");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  name="feedback"
                  color={color}
                  size={size}
                />
              )}
              label="Feedback"
              onPress={() => {
                props.navigation.navigate("Feedback", user._id);
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name='wrench'
                  color={color}
                  size={size}
                />
              )}
              label="Complaint"
              onPress={() => {
                props.navigation.navigate("Complaint");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name='ios-moon'
                  color={color}
                  size={size}
                />
              )}
              label="Dark Mode"
              onPress={() => {
                props.navigation.navigate("Complaint");
              }}
            />

          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Entypo
              name="log-out"
              color={color}
              size={size}
            />
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
  emailStyle: {
    fontSize: 14,
    marginTop: 15,
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
