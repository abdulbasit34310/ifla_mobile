import {
  StyleSheet,
  Text,
  Touchable,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  EvilIcons,
  Entypo,
  Octicons,
  Feather,
} from "react-native-vector-icons";
import { useState } from "react";
import { TouchableRipple } from "react-native-paper";
import AddAddress from "../../components/Profile/AddAddress";

const Addresses = ({ navigation, route }) => {
  const addresses = route.params.item.addresses;
  
  const [isVisible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setVisible(!isVisible);
        }}
      >
        <AddAddress
          isVisible={isVisible}
          setIsVisible={setVisible}
          isCompany={false}
        />
      </Modal>
      <View style={{ flexDirection:"row", justifyContent:"space-between" }}>
        <TouchableRipple style={{ width: '12%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
          navigation.goBack();
        }}>
          <Entypo name='chevron-small-left' size={34} />
        </TouchableRipple>

        <TouchableOpacity
          style={{ marginTop:10}}
          onPress={() => {
            setVisible(true);
          }}
        >
          <EvilIcons name="plus" color="#005761" size={30}></EvilIcons>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 10 }}>
        {addresses.map((address, index) => (
          <View style={styles.addressContainer} id={index} key={index}>
            <View>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: "#E0EFF6",
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <EvilIcons
                  name="trash"
                  size={20}
                  color="#005761"
                ></EvilIcons>
              </TouchableOpacity> */}
            </View>
            <View style={{ margin: 5, marginRight: 10 }}></View>
            <View>
              <Text style={{ fontSize: 16, color: "grey" }}>
                Builidng: {address.building},
              </Text>
              <Text style={{ fontSize: 16, color: "grey" }}>
                {address.street},
              </Text>
              <Text style={{ fontSize: 16, color: "grey" }}>
                {address.city}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0EFF6",
    padding: 10,
  },
  addressContainer: {
    height: 100,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 18,
    elevation: 5,
  },
});
